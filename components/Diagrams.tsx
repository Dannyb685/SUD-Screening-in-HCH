
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, CheckCircle, XCircle, Clock, Activity, Database, Search, Beaker } from 'lucide-react';

// --- METHODOLOGY FUNNEL ---
export const MethodologyFunnel: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-slate-200 w-full h-full min-h-[400px]">
      <div className="flex items-center gap-2 mb-8">
        <Database className="text-medical-teal" size={20} />
        <h3 className="font-serif text-xl text-slate-800">Study Selection Flow</h3>
      </div>
      
      <div className="relative w-full max-w-sm flex flex-col items-center">
        {/* Stage 1: Identification */}
        <div className="w-full relative group">
          <div className="h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-t-xl border border-slate-300 flex flex-col items-center justify-center relative z-10 shadow-sm transition-all group-hover:shadow-md">
            <span className="text-3xl font-bold text-slate-800">322</span>
            <span className="text-xs uppercase tracking-widest text-slate-500 mt-1 font-semibold">Records Identified</span>
          </div>
          <div className="absolute top-1/2 -right-4 translate-x-full -translate-y-1/2 w-32 hidden md:block">
            <div className="text-xs text-slate-400 italic border-l-2 border-slate-200 pl-2">
              PubMed, Gray Literature, Reference Lists
            </div>
          </div>
        </div>

        {/* Connector 1 */}
        <div className="h-8 w-full flex justify-center relative my-1">
             <motion.div 
               initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1, delay: 0.5 }}
               className="w-0.5 bg-slate-300" 
             />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full border border-slate-200 text-slate-400">
               <Search size={12} />
             </div>
        </div>

        {/* Stage 2: Screening (Trapezoid shape simulation) */}
        <div className="w-[70%] relative group">
          <div className="h-20 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-300 flex flex-col items-center justify-center relative z-10 shadow-sm transition-all group-hover:shadow-md clip-path-trapezoid rounded-md">
            <span className="text-sm font-medium text-slate-600">Screening & Exclusion</span>
            <span className="text-[10px] text-slate-400 mt-1 text-center px-2">Did not meet criteria for validation in HCH settings</span>
          </div>
        </div>

        {/* Connector 2 */}
        <div className="h-8 w-full flex justify-center relative my-1">
             <motion.div 
               initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1, delay: 1 }}
               className="w-0.5 bg-slate-300" 
             />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full border border-slate-200 text-slate-400">
               <Filter size={12} />
             </div>
        </div>

        {/* Stage 3: Included */}
        <div className="w-[40%] relative">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, type: 'spring' }}
            className="h-24 bg-gradient-to-br from-medical-teal to-teal-700 rounded-b-xl border border-teal-800 flex flex-col items-center justify-center relative z-10 shadow-lg"
          >
            <span className="text-4xl font-bold text-white">12</span>
            <span className="text-[10px] uppercase tracking-widest text-teal-100 mt-1 font-semibold">Included</span>
            <CheckCircle className="absolute -top-3 -right-3 text-white bg-teal-500 rounded-full p-0.5 border-2 border-white" size={24} />
          </motion.div>
        </div>

        {/* Background Graphic for Funnel Effect */}
        <svg className="absolute top-0 left-0 w-full h-full -z-10 opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L70,50 L85,100 L15,100 L30,50 Z" fill="currentColor" className="text-slate-400" />
        </svg>
      </div>
      
      <div className="mt-8 grid grid-cols-2 gap-4 w-full text-center">
         <div className="p-3 bg-red-50 rounded-lg border border-red-100">
             <span className="block text-xs font-bold text-red-800 uppercase">Excluded</span>
             <span className="text-lg font-serif text-red-600">310</span>
         </div>
         <div className="p-3 bg-teal-50 rounded-lg border border-teal-100">
             <span className="block text-xs font-bold text-teal-800 uppercase">Retained</span>
             <span className="text-lg font-serif text-teal-600">3.7%</span>
         </div>
      </div>
    </div>
  );
};

// --- INSTRUMENT COMPARISON ---
export const InstrumentComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'AUDIT' | 'ADS' | 'SIP' | 'ASI' | 'TLFB'>('AUDIT');

  const content = {
      AUDIT: {
          title: "AUDIT / DAST",
          fullName: "AUDIT & DAST-20",
          type: "Screening (Pike, 2014)",
          substance: "Alcohol (AUDIT) & Polysubstance/Illicit Drugs (DAST)",
          time: "Brief (2-5 mins)",
          pros: [
              "Reliability: Excellent internal consistency (α=0.93 for AUDIT, α=0.86 for DAST).",
              "Performance: Mean score 14.73 for AUDIT (Medium risk); 10.1 for DAST (Substantial risk).",
              "Validity: Correlated w/ Legal History & BDI-II (r=.25)."
          ],
          cons: [
              "Generalizability: Validated only in male, faith-based rehab settings (Pike, 2014).",
              "Constraint: Validated in a sober/housed cohort during rehab.",
              "Independence: Weak correlation between AUDIT & DAST (r=.19) suggests they measure distinct risks."
          ],
          verdict: "Psychometrically superior to other screens but lacks evidence in street-based HCH outreach."
      },
      ADS: {
          title: "ADS",
          fullName: "Alcohol Dependence Scale",
          type: "Screening (Chantarujikapong et al., 1997)",
          substance: "Alcohol Dependence Severity",
          time: "10-15 mins",
          pros: [
              "Reliability: Excellent internal consistency (α=0.99) in homeless women.",
              "Sensitivity: Exceptional range (0.72–0.96) for identifying AUD.",
              "Specificity: Strong performance (0.70–0.88) with adjusted cutoffs (3-8)."
          ],
          cons: [
              "Population Bias: Primary validation limited to homeless women in St. Louis.",
              "Adjustment: Requires lower cutoffs than general populations to maintain specificity.",
              "Scope: Alcohol-specific; requires supplementation for polysubstance monitoring."
          ],
          verdict: "Highest sensitivity of the brief tools; best-in-class for alcohol-specific screening in women."
      },
      SIP: {
          title: "SIP-2R",
          fullName: "Short Inventory of Problems",
          type: "Assessment (Goldstein et al., 2023)",
          substance: "Alcohol-Related Harm",
          time: "Brief (15 items)",
          pros: [
              "Reliability: Strong internal consistency (α=0.94) in homeless AUD samples.",
              "Invariance: Partial scalar invariance across races (NAI, Black, White).",
              "Utility: Validated specifically for cross-cultural harm assessment in Seattle."
          ],
          cons: [
              "Demographics: Validation sample skewed heavily male (80%).",
              "Focus: Measures harms/consequences, not diagnostic criteria or consumption volume.",
              "Context: Best used for harm reduction monitoring rather than initial triage."
          ],
          verdict: "Gold standard for measuring health and social consequences across diverse racial groups."
      },
      ASI: {
          title: "ASI",
          fullName: "Addiction Severity Index",
          type: "Assessment (Zanis et al., 1994)",
          substance: "Multidimensional (Alcohol, Drugs, Med, Social)",
          time: "45-60 mins",
          pros: [
              "Domain Reliability: Medical (α=.93) and Alcohol (α=.87) domains are highly stable.",
              "Performance: 80% sensitivity in detecting drug-positive urine cases via self-report.",
              "Validity: Alcohol CS correlated significantly with ADS (r=.61)."
          ],
          cons: [
              "Unstable Domains: Employment (α=.50) and Family (α=.52) fail psychometric standards.",
              "Burden: 3-day training and long administration is infeasible for HCH workflow (Mäkelä, 2004).",
              "Developer Consensus: McLellan et al. (2004) conceded validity limits in homeless cohorts."
          ],
          verdict: "Valid for medical/alcohol domains but fails psychometric standards for social/legal domains in PEH."
      },
      TLFB: {
          title: "TLFB",
          fullName: "Timeline Followback",
          type: "Assessment (Sacks et al., 2003)",
          substance: "Daily Consumption (Alcohol/Drugs)",
          time: "10-30 mins",
          pros: [
              "Reliability: Good/Excellent ICC (.72–.93) for retrospective recall.",
              "Validation: Strong correlation (r=.68) between self-report and SCRAM monitoring (Rash et al., 2019).",
              "Accuracy: 95-100% detection sensitivity for heavy drinking (>2 drinks)."
          ],
          cons: [
              "Social Risk: High risk of underreporting if punitive sanctions (shelter loss) exist.",
              "Recall Bias: 'Fluidity' of homeless life can impact recall stability (Joyner et al., 1996).",
              "Workflow: Time-intensive calendar method clashes with crisis-driven street medicine."
          ],
          verdict: "Confirms that self-report is accurate in non-punitive settings; best for outcome monitoring."
      }
  };

  const activeData = content[activeTab];

  return (
    <div className="w-full max-w-5xl mx-auto">
        {/* Tabs */}
        <div className="flex justify-center gap-2 md:gap-4 mb-8 flex-wrap">
            {(Object.keys(content) as Array<keyof typeof content>).map((key) => (
                <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-6 py-3 rounded-xl font-serif font-bold text-lg transition-all duration-300 border ${
                        activeTab === key 
                        ? 'bg-medical-teal text-white border-medical-teal shadow-lg scale-105' 
                        : 'bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-700 hover:border-slate-500'
                    }`}
                >
                    {content[key].title}
                </button>
            ))}
        </div>

        {/* Content Card */}
        <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-6 md:p-10 shadow-2xl border border-slate-200 text-slate-800"
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 border-b border-slate-100 pb-6">
                    <div>
                        <h3 className="text-3xl font-serif font-bold text-slate-900 mb-2">{activeData.fullName}</h3>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2 text-medical-teal font-medium">
                                <Activity size={18} /> {activeData.type}
                            </div>
                            <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-sm font-semibold border border-indigo-100">
                                <Beaker size={14} /> {activeData.substance}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg text-slate-600 font-medium whitespace-nowrap mt-4 md:mt-0">
                        <Clock size={18} /> {activeData.time}
                    </div>
                </div>

                {/* Qualitative Data */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-green-50/50 p-6 rounded-xl border border-green-100">
                        <h4 className="flex items-center gap-2 font-bold text-green-800 mb-4 uppercase text-sm tracking-wider">
                            <CheckCircle size={16} /> Psychometric Performance
                        </h4>
                        <ul className="space-y-3">
                            {activeData.pros.map((pro, i) => (
                                <li key={i} className="flex items-start gap-2 text-slate-700 leading-relaxed text-sm">
                                    <span className="block w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 shrink-0"></span>
                                    {pro}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-red-50/50 p-6 rounded-xl border border-red-100">
                        <h4 className="flex items-center gap-2 font-bold text-red-800 mb-4 uppercase text-sm tracking-wider">
                            <XCircle size={16} /> Limitations & HCH Evidence
                        </h4>
                        <ul className="space-y-3">
                            {activeData.cons.map((con, i) => (
                                <li key={i} className="flex items-start gap-2 text-slate-700 leading-relaxed text-sm">
                                    <span className="block w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0"></span>
                                    {con}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center">
                    <div className={`px-6 py-3 rounded-lg text-center font-serif text-lg font-medium border ${
                         activeTab === 'SIP' ? 'bg-green-50 border-green-200 text-green-800' :
                         activeTab === 'TLFB' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                         activeTab === 'AUDIT' ? 'bg-blue-50 border-blue-200 text-blue-800' :
                         activeTab === 'ADS' ? 'bg-purple-50 border-purple-200 text-purple-800' :
                         'bg-red-50 border-red-200 text-red-800'
                    }`}>
                        <span className="font-bold uppercase tracking-wider text-xs block mb-1 opacity-70">Review Conclusion for HCH</span>
                        {activeData.verdict}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    </div>
  );
};
