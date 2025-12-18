
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, CheckCircle, XCircle, Clock, Activity, Database, Search, Beaker, LayoutGrid, ClipboardCheck, Check } from 'lucide-react';

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

        {/* Stage 2: Screening */}
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
type ToolId = 'AUDIT' | 'DAST' | 'ADS' | 'SIP' | 'ASI' | 'TLFB';

export const InstrumentComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ToolId>('AUDIT');

  const content: Record<ToolId, any> = {
      AUDIT: {
          title: "AUDIT",
          category: "Screening",
          fullName: "Alcohol Use Disorders Identification Test",
          type: "Primary Screen",
          substance: "Alcohol Use",
          time: "2-5 mins",
          pros: [
              "Exceptional reliability (α=0.93) in HCH samples.",
              "Stable test-retest reliability among transient males.",
              "Validated for rapid clinical triage."
          ],
          cons: [
              "Scores often skewed high in homeless populations.",
              "Requires immediate physician backup for high scores.",
              "Cutoffs may need gender-specific adjustment."
          ],
          verdict: "Gold standard primary screen for alcohol use in high-volume triage settings."
      },
      DAST: {
          title: "DAST",
          category: "Screening",
          fullName: "Drug Abuse Screening Test",
          type: "Primary Screen",
          substance: "Illicit Drug Use",
          time: "2-5 mins",
          pros: [
              "Effective in identifying substantial drug risk levels.",
              "Maintains strong reliability (α=0.86) in PEH cohorts.",
              "Brief enough for street outreach use."
          ],
          cons: [
              "Does not correlate with alcohol risk; must be co-administered.",
              "Relies on honest disclosure in non-punitive environments.",
              "Focuses on presence of use rather than social harm."
          ],
          verdict: "Essential companion to AUDIT for capturing full polysubstance risk profiles."
      },
      ADS: {
          title: "ADS",
          category: "Assessment",
          fullName: "Alcohol Dependence Scale",
          type: "Severity Assessment",
          substance: "Alcohol Dependence",
          time: "10-15 mins",
          pros: [
              "Exceptional reliability (α=0.99) in homeless women.",
              "High sensitivity (0.72–0.96) for identifying AUD.",
              "Excellent for measuring depth of dependence."
          ],
          cons: [
              "Primary validation limited to female samples in St. Louis.",
              "Authors used it for screening, but it lacks specific psychometric validation for that purpose.",
              "Doesn't capture consumption volume data."
          ],
          verdict: "ADS is primarily an assessment tool and validated as such. Although some authors have utilized it for screening, it hasn't been psychometrically validated for that purpose."
      },
      SIP: {
          title: "SIP-2R",
          category: "Assessment",
          fullName: "Short Inventory of Problems",
          type: "Harm Assessment",
          substance: "Alcohol-Related Harm",
          time: "5-8 mins",
          pros: [
              "Strong internal consistency (α=0.94).",
              "Valid across racial groups (NAI, Black, White).",
              "Seattle-validated specifically for PEH."
          ],
          cons: [
              "Focuses on harms, not diagnostic criteria.",
              "Heavily male-skewed validation data (80%).",
              "Secondary to initial diagnostic triage."
          ],
          verdict: "Optimal for cross-cultural harm assessment and longitudinal monitoring."
      },
      ASI: {
          title: "ASI",
          category: "Assessment",
          fullName: "Addiction Severity Index",
          type: "Comprehensive Assessment",
          substance: "Multidimensional Social/Legal",
          time: "45-60 mins",
          pros: [
              "Excellent medical (α=.93) and drug (α=.87) domains.",
              "80% sensitivity for drug-positive urine verification.",
              "Broad research standardization."
          ],
          cons: [
              "Social/Legal domains show poor reliability (α<.55).",
              "Prohibitive administrative burden (60 mins).",
              "Inconsistent results for family and legal history in PEH."
          ],
          verdict: "Valid for medical and drug domains but inefficient for HCH street medicine."
      },
      TLFB: {
          title: "TLFB",
          category: "Assessment",
          fullName: "Timeline Followback",
          type: "Detailed Monitoring",
          substance: "Daily Consumption Pattern",
          time: "10-30 mins",
          pros: [
              "Excellent ICC (.72–.93) for retrospective recall.",
              "Highly accurate (95-100% sensitivity) for heavy use.",
              "Matches objective monitoring (SCRAM) closely."
          ],
          cons: [
              "Prone to underreporting if services are contingent on sobriety.",
              "Requires stable recall periods (impacted by trauma).",
              "Highly time-intensive calendar method."
          ],
          verdict: "Superior for long-term treatment monitoring and objective consumption data."
      }
  };

  const activeData = content[activeTab];

  return (
    <div className="w-full max-w-5xl mx-auto">
        {/* Grouped Tabs Header */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
          {/* Screening Group */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <LayoutGrid size={12} /> Screening Tools
            </span>
            <div className="flex gap-2">
              {['AUDIT', 'DAST'].map((key) => (
                <button
                    key={key}
                    onClick={() => setActiveTab(key as ToolId)}
                    className={`px-6 py-2 rounded-xl font-serif font-bold transition-all duration-300 border ${
                        activeTab === key 
                        ? 'bg-medical-teal text-white border-medical-teal shadow-md' 
                        : 'bg-white text-slate-500 border-slate-200 hover:border-medical-teal/30 hover:bg-slate-50'
                    }`}
                >
                    {content[key as ToolId].title}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-slate-200"></div>

          {/* Assessment Group */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <ClipboardCheck size={12} /> Assessment Tools
            </span>
            <div className="flex gap-2 flex-wrap justify-center">
              {['ADS', 'SIP', 'ASI', 'TLFB'].map((key) => (
                <button
                    key={key}
                    onClick={() => setActiveTab(key as ToolId)}
                    className={`px-6 py-2 rounded-xl font-serif font-bold transition-all duration-300 border ${
                        activeTab === key 
                        ? 'bg-medical-teal text-white border-medical-teal shadow-md' 
                        : 'bg-white text-slate-500 border-slate-200 hover:border-medical-teal/30 hover:bg-slate-50'
                    }`}
                >
                    {content[key as ToolId].title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Card - Light Style */}
        <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-50 rounded-2xl p-6 md:p-10 border border-slate-100 shadow-sm"
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 border-b border-slate-200 pb-6">
                    <div>
                        <h3 className="text-3xl font-serif font-bold text-slate-900 mb-2">{activeData.fullName}</h3>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2 text-medical-teal font-medium text-sm">
                                <Activity size={16} /> {activeData.type}
                            </div>
                            <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-0.5 rounded-full text-[10px] font-bold border border-indigo-100 uppercase tracking-wider">
                                <Beaker size={12} /> {activeData.substance}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-slate-500 text-xs font-bold whitespace-nowrap mt-4 md:mt-0 uppercase tracking-widest">
                        <Clock size={16} className="text-slate-400" /> {activeData.time}
                    </div>
                </div>

                {/* Qualitative Data */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-4 uppercase text-[10px] tracking-widest">
                            <CheckCircle size={14} className="text-medical-teal" /> Validation Performance
                        </h4>
                        <ul className="space-y-4">
                            {activeData.pros.map((pro: string, i: number) => (
                                <li key={i} className="flex items-start gap-3 text-slate-600 leading-relaxed text-sm">
                                    <Check size={14} className="text-medical-teal mt-1 shrink-0" />
                                    {pro}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-4 uppercase text-[10px] tracking-widest">
                            <XCircle size={14} className="text-amber-500" /> Key Limitations
                        </h4>
                        <ul className="space-y-4">
                            {activeData.cons.map((con: string, i: number) => (
                                <li key={i} className="flex items-start gap-3 text-slate-600 leading-relaxed text-sm">
                                    <span className="block w-1 h-1 bg-amber-500 rounded-full mt-2 shrink-0"></span>
                                    {con}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-200 flex items-center justify-center">
                    <div className="px-6 py-4 rounded-xl text-center font-serif text-slate-700 bg-white border border-slate-200 shadow-sm max-w-2xl">
                        <span className="font-bold uppercase tracking-[0.2em] text-[10px] block mb-2 text-medical-teal">HCH Context Conclusion</span>
                        <p className="text-base italic leading-relaxed">{activeData.verdict}</p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    </div>
  );
};
