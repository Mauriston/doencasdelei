import React from 'react';
import { LAWS } from '../constants';
import { Book } from 'lucide-react';
import { Header } from './Header';

export const LawReference: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <Header title="Legislação" />
      <div className="p-4 space-y-6 animate-fade-in overflow-auto">
        <div className="text-center mb-6">
          <p className="text-gray-500 text-sm mt-1">Base legal para inspeções de saúde na Marinha</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {LAWS.map((law) => (
            <div key={law.id} className="bg-white p-5 rounded-lg shadow border-t-4 border-green hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="p-2 bg-green/10 rounded-lg">
                  <Book className="text-green" size={24} />
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {law.number}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-navy font-heading">{law.title}</h3>
              <p className="mt-2 text-sm text-gray-600 font-body leading-relaxed">
                {law.description}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-500 mb-2">Pontos Chave:</p>
                <div className="flex flex-wrap gap-2">
                  {law.keyArticles.map((article, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 text-[10px] px-2 py-1 rounded font-mono">
                      {article}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-navy-light text-white p-4 rounded-lg mt-8">
          <h4 className="font-heading text-gold mb-2">Nota Importante</h4>
          <p className="text-sm opacity-90 font-body">
            A Portaria Normativa nº 3.551/2021 do Ministério da Defesa uniformiza os procedimentos. 
            Sempre observe a data de vigência e possíveis revogações.
          </p>
        </div>
      </div>
    </div>
  );
};