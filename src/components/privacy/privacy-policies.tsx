import type { PrivacyFile } from '@/types/privacy';
import { cn } from 'lib/utils';
import React from "react";
function renderHTML(text: string) {
  const parts = text.split(/(<b>.*?<\/b>)/g);
  return parts.map((part, i) => {
    if (part.match(/<b>(.*?)<\/b>/)) {
      const content = part.replace(/<\/?b>/g, '');
      return <strong key={i}>{content}</strong>;
    }
    if (part.match(/&bull;/)) {
      const content = part.replace(/&bull;/g, '').trim();
      return (
        <span key={i} className="flex items-start">
          <span className="mr-2 mt-1 text-lg leading-none">&bull;</span>
          <span>{content}</span>
        </span>
      );
    }
    return part;
  });
}
const PrivacyPolicy: React.FC<{privacy: PrivacyFile}> = ({privacy}) => {

  return (
    <div className="w-full pr-6 space-y-6 text-justify">
      <section>
        {
          privacy?.board?.resume && privacy?.board.resume?.split('\n\n').map(el => (
            <p className="mb-4" key={el}>
              {el}
            </p>
          ))
        }
      </section>

      <section>
        {/* <h3 className="text-lg font-bold text-primary mb-3">QUADRO RESUMO</h3> */}
        <div className="overflow-x-auto mb-6">
          {
            privacy?.board?.sections.map(section => {
              return (
                <section key={section.title} className='flex flex-col gap-4 mb-4'>
                  <h3 className="text-lg font-bold text-primary mb-3">{section.title}</h3>
                  {
                    section.description && section.description.split('\n\n').map(el => (
                      <p className="mb-4" key={el}>
                        {el}
                      </p>
                    ))
                  }
                  {
                    section.table && (
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            {(section.table.headers || []).map((header) => (
                              <th className="border border-gray-300 p-3 text-left font-semibold" key={header}>
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(section.table.rows || []).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.columns.map((cell: { content: string; bold?: boolean; }, cellIndex) => (
                                <td key={cellIndex} className="border border-gray-300 p-3 align-top">
                                  <span className={cn({ 'font-bold': (cell?.bold || false) })}>{cell.content} </span>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )
                  }
                  {
                    section.content && section.content.split('\n\n').map(el => (
                      <p className="mb-4 flex flex-col">
                        {el.split('\n').map(el => (
                          <span key={el}>
                            {renderHTML(el)}
                          </span>
                        ))}
                      </p>
                    ))
                  }
                </section>
              );
            })
          }
        </div>
      </section>

     

      <div className="text-sm italic text-gray-600 mt-8">
        <p>Versão {privacy.version}</p>
        <p>Última atualização: {privacy.lastUpdated}</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
