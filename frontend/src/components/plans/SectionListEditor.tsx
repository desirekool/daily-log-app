import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export interface SectionDef {
  id: string;
  name: string;
}

interface Props {
  sections: SectionDef[];
  onChange: (sections: SectionDef[]) => void;
  readOnly?: boolean;
}

const SectionListEditor: React.FC<Props> = ({ sections, onChange, readOnly }) => {
  const updateName = (index: number, name: string) => {
    const updated = sections.map((s, i) => (i === index ? { ...s, name } : s));
    onChange(updated);
  };

  const addRow = () => {
    onChange([...sections, { id: crypto.randomUUID(), name: '' }]);
  };

  const removeRow = (index: number) => {
    onChange(sections.filter((_, i) => i !== index));
  };

  return (
    <div className="border border-border rounded-md">
      <table className="w-full">
        <thead>
          <tr className="bg-muted/50">
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Section Name
            </th>
            {!readOnly && <th className="w-10 px-2 py-2" />}
          </tr>
        </thead>
        <tbody>
          {sections.map((section, i) => (
            <tr key={section.id} className="border-t border-border">
              <td className="px-3 py-2">
                <input
                  type="text"
                  value={section.name}
                  onChange={(e) => updateName(i, e.target.value)}
                  className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm p-0"
                  placeholder="e.g., Morning"
                  readOnly={readOnly}
                />
              </td>
              {!readOnly && (
                <td className="px-2 py-2 text-center">
                  {sections.length > 1 && (
                    <button type="button" onClick={() => removeRow(i)} className="text-destructive opacity-50 hover:opacity-100 transition-opacity">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {!readOnly && (
        <div className="px-3 py-2 border-t border-border">
          <button type="button" onClick={addRow} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Plus className="h-3.5 w-3.5" />
            Add Row
          </button>
        </div>
      )}
    </div>
  );
};

export default SectionListEditor;
