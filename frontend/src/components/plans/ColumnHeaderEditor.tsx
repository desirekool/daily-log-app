import React, { useRef, useEffect, useState } from 'react';
import { MoreVertical, Plus, Trash2 } from 'lucide-react';

export interface ColumnDef {
  id: string;
  name: string;
}

interface Props {
  columns: ColumnDef[];
  onChange: (columns: ColumnDef[]) => void;
  readOnly?: boolean;
}

const ColumnHeaderEditor: React.FC<Props> = ({ columns, onChange, readOnly }) => {
  const [menuIdx, setMenuIdx] = useState<number | null>(null);
  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuIdx !== null) {
        const el = menuRefs.current[menuIdx];
        if (el && !el.contains(e.target as Node)) {
          setMenuIdx(null);
        }
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuIdx]);

  const updateName = (index: number, name: string) => {
    const updated = columns.map((c, i) => (i === index ? { ...c, name } : c));
    onChange(updated);
  };

  const addColumn = (index: number, side: 'left' | 'right') => {
    const neu: ColumnDef = { id: crypto.randomUUID(), name: '' };
    const updated = [...columns];
    updated.splice(side === 'left' ? index : index + 1, 0, neu);
    onChange(updated);
    setMenuIdx(null);
  };

  const removeColumn = (index: number) => {
    onChange(columns.filter((_, i) => i !== index));
    setMenuIdx(null);
  };

  const addEnd = () => {
    onChange([...columns, { id: crypto.randomUUID(), name: '' }]);
  };

  const cells = columns.map((col, i) => (
    <th key={col.id} className="relative border-r border-border last:border-r-0 px-3 py-2 text-left font-medium text-sm">
      <div className="flex items-center gap-1">
        <input
          type="text"
          value={col.name}
          onChange={(e) => updateName(i, e.target.value)}
          className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-sm font-medium p-0"
          placeholder="Column name"
          readOnly={readOnly}
        />
        {!readOnly && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setMenuIdx(menuIdx === i ? null : i)}
            className="shrink-0 opacity-30 hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      {menuIdx === i && !readOnly && (
        <div
          ref={(el) => { menuRefs.current[i] = el; }}
          className="absolute left-0 top-full z-50 mt-1 w-44 rounded-md border border-border bg-popover shadow-lg"
        >
          <div className="py-1">
            {i > 0 && <MenuBtn label="Add column left" onClick={() => addColumn(i, 'left')} />}
            <MenuBtn label="Add column right" onClick={() => addColumn(i, 'right')} />
            <hr className="my-1 border-border" />
            <MenuBtn label="Delete column" onClick={() => removeColumn(i)} destructive />
          </div>
        </div>
      )}
    </th>
  ));

  return (
    <div className="border border-border rounded-md">
      <table className="w-full">
        <thead>
          <tr>
            {cells}
            {!readOnly && (
              <th className="w-10 px-2 py-2">
                <button type="button" onClick={addEnd} className="flex items-center justify-center w-6 h-6 rounded hover:bg-accent transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={columns.length + 1} className="px-3 py-4 text-center text-xs text-muted-foreground">
              Columns appear as table headers in the tracking view
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const MenuBtn: React.FC<{ label: string; onClick: () => void; destructive?: boolean }> = ({ label, onClick, destructive }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2 w-full px-3 py-1.5 text-sm hover:bg-accent text-left ${destructive ? 'text-destructive' : ''}`}
  >
    {destructive ? <Trash2 className="h-3.5 w-3.5" /> : <span className="w-3.5 h-3.5" />}
    {label}
  </button>
);

export default ColumnHeaderEditor;
