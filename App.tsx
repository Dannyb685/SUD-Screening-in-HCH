
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { AbstractBackground } from './components/QuantumScene';
import { MethodologyFunnel, InstrumentComparison } from './components/Diagrams';
import { 
  ArrowDown, Menu, X, BookOpen, HeartPulse, Scale, 
  FileText, Users, Activity, ChevronRight, AlertTriangle, 
  Lightbulb, Share2, Printer, Check, Copy, ExternalLink 
} from 'lucide-react';

const Reference = ({ text, index }: { text: string, index: number }) => (
  <div className="flex gap-4 text-sm text-slate-600 mb-4">
    <span className="font-bold text-medical-teal shrink-0">[{index}]</span>
    <p>{text}</p>
  </div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'SUD Screening in Homeless Healthcare',
      text: 'Check out this comparative review on validated instruments for substance use disorders in homeless populations.',
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const tocItems = [
    { id: 'background', label: 'Background', sub: 'Introduction & Context', icon: Users },
    { id: 'methods', label: 'Methods', sub: 'Literature Search', icon: BookOpen },
    { id: 'results', label: 'Results', sub: 'Tool Analysis', icon: Activity },
    { id: 'equity', label: 'Discussion', sub: 'Conclusions & Future', icon: Scale },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-medical-teal selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-medical-teal rounded-lg flex items-center justify-center text-white shadow-sm">
              <HeartPulse size={18} />
            </div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              SUD<span className="text-medical-teal">REVIEW</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium tracking-wide text-slate-600">
            <div className="flex items-center gap-6 mr-6 border-r border-slate-200 pr-8">
                <a href="#background" onClick={scrollToSection('background')} className="hover:text-medical-teal transition-colors cursor-pointer uppercase">Background</a>
                <a href="#methods" onClick={scrollToSection('methods')} className="hover:text-medical-teal transition-colors cursor-pointer uppercase">Methods</a>
                <a href="#results" onClick={scrollToSection('results')} className="hover:text-medical-teal transition-colors cursor-pointer uppercase">Results</a>
                <a href="#equity" onClick={scrollToSection('equity')} className="hover:text-medical-teal transition-colors cursor-pointer uppercase">Discussion</a>
            </div>
            
            <div className="flex items-center gap-2">
                <button 
                  onClick={handleShare}
                  className="p-2 text-slate-400 hover:text-medical-teal hover:bg-medical-light/50 rounded-full transition-all flex items-center gap-2 group"
                  title="Share Link"
                >
                    <Share2 size={18} />
                    <span className="text-xs uppercase font-bold hidden lg:inline">Share</span>
                </button>
                <button 
                  onClick={handlePrint}
                  className="p-2 text-slate-400 hover:text-medical-teal hover:bg-medical-light/50 rounded-full transition-all flex items-center gap-2 group"
                  title="Export to PDF"
                >
                    <Printer size={18} />
                    <span className="text-xs uppercase font-bold hidden lg:inline">Export</span>
                </button>
            </div>
          </div>

          <button className="md:hidden text-slate-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in no-print">
            <a href="#background" onClick={scrollToSection('background')} className="hover:text-medical-teal transition-colors cursor-pointer uppercase">Background</a>
            <a href="#methods" onClick={scrollToSection('methods')} className="hover:text-medical-teal transition-colors cursor-pointer uppercase">Methods</a>
            <a href="#results" onClick={scrollToSection('results')} className="hover:text-medical-teal transition-colors cursor-pointer uppercase">Results</a>
            <a href="#equity" onClick={scrollToSection('equity')} className="hover:text-medical-teal transition-colors cursor-pointer uppercase">Discussion</a>
            <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-slate-100 w-48">
                <button onClick={handleShare} className="flex items-center justify-center gap-3 py-3 bg-slate-50 rounded-xl text-base font-sans font-medium">
                    <Share2 size={20} /> Share Link
                </button>
                <button onClick={handlePrint} className="flex items-center justify-center gap-3 py-3 bg-slate-50 rounded-xl text-base font-sans font-medium">
                    <Printer size={20} /> Save as PDF
                </button>
            </div>
            <button className="absolute top-6 right-6 p-4" onClick={() => setMenuOpen(false)}>
                <X size={32} />
            </button>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="no-print">
            <AbstractBackground />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(248,250,252,0.92)_0%,rgba(248,250,252,0.6)_50%,rgba(248,250,252,0.3)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
          <div className="inline-block mb-6 px-4 py-1.5 border border-medical-teal text-medical-dark text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-medical-light/30">
            Systematic Review
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium leading-tight mb-8 text-slate-900 drop-shadow-sm">
            Validated Instruments for Substance Use Disorders in <span className="text-medical-teal italic">Homeless Healthcare</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 font-light leading-relaxed mb-12">
            A comparative review identifying appropriate screening and assessment tools for outreach-based settings to facilitate rapid linkage to treatment.
          </p>
          
          <div className="flex flex-col items-center gap-8 no-print">
             <a href="#toc" onClick={scrollToSection('toc')} className="group flex flex-col items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-900 transition-colors cursor-pointer">
                <span>START PRESENTATION</span>
                <span className="p-2 border border-slate-300 rounded-full group-hover:border-slate-900 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Table of Contents */}
        <section id="toc" className="py-20 bg-slate-50 border-b border-slate-200">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Structure</span>
                    <h2 className="font-serif text-3xl text-slate-900 mt-2">Table of Contents</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tocItems.map((item, idx) => (
                        <a 
                        key={item.id} 
                        href={`#${item.id}`} 
                        onClick={scrollToSection(item.id)}
                        className="group relative p-8 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-medical-teal/30 hover:-translate-y-1 transition-all duration-300 flex flex-col items-start overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <item.icon size={64} className="text-medical-teal" />
                            </div>
                            
                            <span className="text-xs font-bold text-medical-teal uppercase tracking-widest mb-4">
                                Section 0{idx + 1}
                            </span>
                            
                            <h3 className="font-serif text-xl font-bold text-slate-900 mb-2 group-hover:text-medical-teal transition-colors">
                                {item.label}
                            </h3>
                            
                            <p className="text-sm text-slate-500 mb-6">
                                {item.sub}
                            </p>

                            <div className="mt-auto flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-medical-teal transition-colors uppercase tracking-wider no-print">
                                View Section <ChevronRight size={14} />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>

        {/* Background */}
        <section id="background" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase">01 Introduction</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-slate-900">The Implementation Gap</h2>
              <div className="w-16 h-1 bg-medical-teal mb-6"></div>
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                <Users className="text-medical-teal mb-4" />
                <p className="text-sm text-slate-600 italic">
                  "Mobile clinics, shelters, and other nontraditional care environments serve as critical first points of contact."
                </p>
              </div>
            </div>
            <div className="md:col-span-8 text-lg text-slate-600 leading-relaxed space-y-6">
              <p>
                People experiencing homelessness (PEH) are disproportionately affected by substance use disorders (SUD), yet the widespread screening, diagnosis, and linkage to treatment for these conditions remain problematic.
              </p>
              <p>
                The USPSTF, SAMHSA, and NHCHC have recommended implementing screeners for SUD in homeless populations; however, few existing SUD-related instruments are validated within diverse homeless populations and healthcare for the homeless (HCH) service settings.
              </p>
              <p>
                HCH programs often face obstacles implementing standardized screening, brief intervention, and referral to treatment (SBIRT) protocols due to uncertainty about each instrument’s <strong className="text-slate-900">feasibility, validation, staff training</strong>, and the interruption of service provision.
              </p>
            </div>
          </div>
        </section>

        {/* Methods */}
        <section id="methods" className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-slate-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-slate-200">
                            <BookOpen size={14}/> 02 Methodology
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-slate-900">Systematic Literature Search</h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                           We conducted a systematic search in PubMed and related databases, supplemented by gray literature. Inclusion criteria focused on studies validating standardized SUD tools in adults in HCH settings with presenting performance data.
                        </p>
                        <ul className="space-y-4 text-slate-600">
                          <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-medical-teal mt-2.5"></div>
                            <span>Extracted data on psychometric properties (sensitivity, specificity).</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-medical-teal mt-2.5"></div>
                            <span>Analyzed feasibility and implementation challenges in outreach settings.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-medical-teal mt-2.5"></div>
                            <span>Narrative synthesis of barriers and facilitators.</span>
                          </li>
                        </ul>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                        <MethodologyFunnel />
                    </div>
                </div>
            </div>
        </section>

        {/* Results */}
        <section id="results" className="py-24 bg-slate-900 text-slate-100 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none no-print">
                <div className="w-96 h-96 rounded-full bg-medical-teal blur-[100px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-blue-600 blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-medical-teal uppercase">03 Findings</div>
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Evidence Synthesis</h2>
                    <p className="text-lg text-slate-400">
                        Our review identified 12 key entries including primary psychometric validation studies, reviews, and commentaries. While several tools show high reliability, the feasibility of implementation in rapid-triage HCH settings remains a critical barrier.
                    </p>
                </div>
                
                <InstrumentComparison />
                
            </div>
        </section>

        {/* Discussion & Conclusions */}
        <section id="equity" className="py-24 bg-white">
             <div className="container mx-auto px-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-medical-light text-medical-dark text-xs font-bold tracking-widest uppercase rounded-full mb-8">
                    <FileText size={14}/> 04 Discussion & Conclusions
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
                    {/* Column 1: The Context & The Gap */}
                    <div>
                        <h3 className="font-serif text-3xl mb-6 text-slate-900">Prevalence vs. Stigma</h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            Substance use disorder is a leading cause of death for our patients, often manifesting from a lifetime of poverty, exclusion, and trauma. However, <strong className="text-slate-900">homelessness is a problem of affordable housing and is not synonymous with addiction.</strong> Approximately 60% of people experiencing homelessness do not meet criteria for AUD, yet prevalence remains significantly higher than the general population (84% of chronically homeless men in some studies).
                        </p>
                        
                        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100 mb-8">
                            <div className="flex items-center gap-2 mb-3 text-yellow-800 font-bold uppercase text-xs tracking-wide">
                                <AlertTriangle size={16}/> The Validation Gap
                            </div>
                            <p className="text-sm text-yellow-900/80">
                                While USPSTF and SAMHSA recommend screening, widespread tools (ASI, AUDIT) lack robust validation in HCH settings. Questions regarding hygiene, food storage, or sleep quality often fail to account for the reality of homelessness, skewing validity (Gordon et al.).
                            </p>
                        </div>

                        <h3 className="font-serif text-3xl mb-6 text-slate-900">The "Street Reality"</h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            Reality confronts us with a difficult trade-off in street outreach: <strong className="text-slate-900">Rapport vs. Paperwork</strong>. Formal screening can interrupt the delicate trust-building process.
                        </p>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                             While expert clinicians can diagnose via unstructured interview, volunteer or student-run teams benefit from protocolized approaches. However, self-reporting is often under-reported due to fear of losing services or shelter access.
                        </p>
                    </div>

                    {/* Column 2: Strategies & Future */}
                    <div>
                        <h3 className="font-serif text-3xl mb-6 text-slate-900">Practical Strategies</h3>
                        <div className="space-y-6 mb-8">
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                    <Activity size={16} className="text-medical-teal"/> Single-Item Screeners
                                </h4>
                                <p className="text-slate-600 text-sm">
                                    The USPSTF recommends single-question screens for alcohol/drugs. They offer a fair trade-off between ease of use and accuracy (Sensitivity 82-87%), making them potentially suitable for high-turnover street clinics despite the lack of specific HCH validation.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                    <Scale size={16} className="text-medical-teal"/> Adapting SBIRT
                                </h4>
                                <p className="text-slate-600 text-sm">
                                    SBIRT is cost-effective but relies on stable settings. For street medicine, it must be adapted to include immediate physician assessment for on-site treatment initiation and low-barrier harm reduction distribution.
                                </p>
                            </div>
                        </div>

                        <div className="bg-medical-bg p-6 rounded-xl border-l-4 border-medical-teal">
                            <h4 className="font-serif text-xl text-slate-900 mb-4 flex items-center gap-2">
                                <Lightbulb size={20} className="text-medical-teal"/> Future Directions
                            </h4>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                We need instruments that are respectful, brief, and accessible to those with neurocognitive impairments. 
                            </p>
                            <p className="text-slate-700 font-medium italic">
                                "Employing a community-engaged research approach to involve patients in the selection and adaptation of screening tools can ensure that the instruments are acceptable to those they are intended to serve."
                            </p>
                        </div>
                    </div>
                </div>
             </div>
        </section>

        {/* References */}
        <section className="py-24 bg-slate-100 border-t border-slate-200">
           <div className="container mx-auto px-6 max-w-4xl">
              <h3 className="font-serif text-2xl mb-8 text-slate-900">Key References</h3>
              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <Reference index={1} text="Zanis, D. A., McLellan, A. T., Cnaan, R. A., & Randall, M. (1994). Reliability and validity of the Addiction Severity Index with a homeless sample. Journal of Substance Abuse Treatment, 11(6), 541-548." />
                <Reference index={2} text="Argeriou, M., McCarty, D., Mulvey, K., & Daley, M. (1994). Use of the addiction severity index with homeless substance abusers. Journal of Substance Abuse Treatment, 11(4), 359–365." />
                <Reference index={3} text="Drake, R. E., McHugo, G. J., & Biesanz, J. C. (1995). The test-retest reliability of standardized instruments among homeless persons with substance use disorders. Journal of Studies on Alcohol, 56(2), 161–167." />
                <Reference index={4} text="Goldfinger, S. M., Schutt, R. K., Tolomiczenko, G. S., Seidman, L., Penk, W. E., Turner, W. M., & Caplan, B. (1996). Housing placement and subsequent days homeless among formerly homeless adults with mental illness. Psychiatric Services, 50(5), 674–679." />
                <Reference index={5} text="Joyner, L. M., Wright, J. D., & Devine, J. A. (1996). Reliability and validity of the Addiction Severity Index among homeless substance misusers. Substance Use & Misuse, 31(6), 729–751." />
                <Reference index={6} text="Chantarujikapong, S. I., Smith, E. M., & Fox, L. W. (1997). Comparison of the Alcohol Dependence Scale and Diagnostic Interview Schedule in homeless women. Alcoholism: Clinical and Experimental Research, 21(4), 586-595." />
                <Reference index={7} text="Sacks, J. A., Drake, R. E., Williams, V. F., Banks, S. M., & Herrell, J. M. (2003). Utility of the Time-Line Follow-Back to assess substance use among homeless adults. Journal of Nervous and Mental Disease, 191(3), 145-153." />
                <Reference index={8} text="Pike, S. L. (2014). The assessment of alcohol use disorders among homeless men in residential treatment [Unpublished clinical doctoral dissertation]. Pepperdine University." />
                <Reference index={9} text="Goldstein, S. C., Spillane, N. S., Tate, M., Nelson, L., & Collins, S. E. (2023). Measurement Invariance and Other Psychometric Properties of the Short Inventory of Problems (SIP-2R) Across Racial Groups in Adults Experiencing Homelessness and Alcohol Use Disorder. Psychology of Addictive Behaviors, 37(2), 199–208." />
                <Reference index={10} text="Rash, C. J., Petry, N. M., Alessi, S. M., & Barnett, N. P. (2019). Monitoring alcohol use in heavy drinking soup kitchen attendees. Alcohol, 81, 139-147." />
              </div>
           </div>
        </section>

        {/* Share Section - Added for direct user action at the end */}
        <section className="py-20 bg-medical-teal text-white text-center no-print">
            <div className="container mx-auto px-6 max-w-2xl">
                <Share2 size={48} className="mx-auto mb-6 opacity-80" />
                <h3 className="font-serif text-3xl mb-4">Share this Comparative Review</h3>
                <p className="text-teal-50 mb-8 opacity-90">Help colleagues and healthcare providers access this synthesis of SUD instruments validated for homeless populations.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={handleShare}
                        className="px-8 py-4 bg-white text-medical-teal font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                    >
                        <Copy size={20} /> Copy Link to Presentation
                    </button>
                    <button 
                        onClick={handlePrint}
                        className="px-8 py-4 bg-medical-dark text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                    >
                        <Printer size={20} /> Save as Medical Report (PDF)
                    </button>
                </div>
            </div>
        </section>

      </main>

      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2">Comparative Review</div>
                <p className="text-sm">Substance Use Disorders in Homeless Healthcare Settings</p>
            </div>
            <div className="text-center md:text-right text-xs">
              <p>Presentation Date: April 25-26, 2025</p>
              <p className="mt-1">No Financial Relationships to Disclose</p>
              <div className="mt-4 flex justify-center md:justify-end gap-4 no-print">
                <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-white transition-colors uppercase tracking-widest font-bold">Back to Top</button>
              </div>
            </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-toast-in">
            <div className="w-6 h-6 bg-medical-teal rounded-full flex items-center justify-center">
                <Check size={14} strokeWidth={3} />
            </div>
            <span className="font-medium text-sm">Link copied to clipboard</span>
        </div>
      )}
    </div>
  );
};

export default App;
