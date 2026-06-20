import React, { useState } from 'react';
import { MDXEditor, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin, tablePlugin } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { Plan } from '../../types';
import { updateLog, createLog } from '../../services/logService';
import { Button } from '../ui/button';

function planToMarkdown(plan: Plan): string {
  const lines: string[] = [];

  lines.push(`# ${plan.name}`);
  if (plan.description) {
    lines.push('');
    lines.push(plan.description);
  }
  lines.push('');

  const sortedSections = [...(plan.sections || [])].sort((a, b) => a.position - b.position);

  sortedSections.forEach((section) => {
    lines.push(`## ${section.name}`);
    if (section.description) {
      lines.push('');
      lines.push(section.description);
    }
    lines.push('');

    const sectionLogs = (plan.dailyLogs || [])
      .filter((l) => l.sectionId === section.id)
      .sort((a, b) => a.dayNumber - b.dayNumber);

    if (sectionLogs.length === 0) {
      lines.push('*No entries yet.*');
      lines.push('');
      return;
    }

    const cols = [...(plan.columns || [])].filter((c) => !c.isTracker).sort((a, b) => a.position - b.position);

    const header = cols.map((c) => c.name).join(' | ');
    const separator = cols.map(() => '---').join(' | ');
    lines.push(`| ${header} |`);
    lines.push(`| ${separator} |`);

    sectionLogs.forEach((log) => {
      const entryMap = new Map<number, string>();
      log.logEntries?.forEach((e) => entryMap.set(e.planColumnId, e.entryValue));

      const row = cols.map((col) => {
        const val = entryMap.get(col.id) || '';
        if (col.isTracker) {
          return val === '[x]' ? '✅' : '⬜';
        }
        return val;
      }).join(' | ');
      lines.push(`| ${row} |`);
    });

    lines.push('');
  });

  return lines.join('\n');
}

function parseMarkdownToEntries(
  md: string,
  plan: Plan
): { sectionId: number; dayNumber: number; entries: { [key: number]: string } }[] {
  const result: { sectionId: number; dayNumber: number; entries: { [key: number]: string } }[] = [];

  const lines = md.split('\n');
  const sortedSections = [...(plan.sections || [])].sort((a, b) => a.position - b.position);
  const sortedCols = [...(plan.columns || [])].filter((c) => !c.isTracker).sort((a, b) => a.position - b.position);

  let sectionIdx = -1;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const sectionMatch = line.match(/^##\s+(.+)/);

    if (sectionMatch) {
      sectionIdx++;
      i++;

      while (i < lines.length && !lines[i].startsWith('|')) {
        i++;
      }
      if (i >= lines.length) continue;

      const headers = lines[i].split('|').map((h) => h.trim()).filter(Boolean);
      i++;

      if (i < lines.length && lines[i].includes('---')) {
        i++;
      }

      while (i < lines.length && lines[i].startsWith('|')) {
        const cells = lines[i].split('|').map((c) => c.trim()).filter(Boolean);
        i++;

        if (cells.length === 0) continue;

        const entries: { [key: number]: string } = {};
        let dayNumber = 0;

        headers.forEach((header, idx) => {
          const col = sortedCols.find((c) => c.name.toLowerCase() === header.toLowerCase());
          if (!col) return;
          const val = cells[idx] || '';

          const processedVal = col.isTracker
            ? (val === '✅' ? '[x]' : val === '⬜' ? '[ ]' : val)
            : val;

          entries[col.id] = processedVal;

          const dayCol = sortedCols.find((c) => c.position === 0);
          if (dayCol && col.id === dayCol.id) {
            dayNumber = parseInt(val) || 0;
          }
        });

        if (dayNumber > 0 && sectionIdx >= 0 && sectionIdx < sortedSections.length) {
          result.push({
            sectionId: sortedSections[sectionIdx].id,
            dayNumber,
            entries,
          });
        }
      }
    } else {
      i++;
    }
  }

  return result;
}

interface Props {
  plan: Plan;
  onSaveComplete?: () => void;
  onAdvancePhase?: (phase: string) => void;
}

const PlanMarkdownView: React.FC<Props> = ({ plan, onSaveComplete, onAdvancePhase }) => {
  const md = planToMarkdown(plan);
  const [currentMd, setCurrentMd] = useState(md);
  const [saving, setSaving] = useState(false);

  const handleExport = async () => {
    try {
      await navigator.clipboard.writeText(currentMd);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = currentMd;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  };

  const handleSave = async (advance?: boolean) => {
    setSaving(true);
    try {
      const parsed = parseMarkdownToEntries(currentMd, plan);
      for (const entry of parsed) {
        const existingLog = plan.dailyLogs?.find(
          (l) => l.sectionId === entry.sectionId && l.dayNumber === entry.dayNumber
        );

        if (existingLog) {
          await updateLog(plan.id, existingLog.id, {
            date: existingLog.date,
            dayNumber: existingLog.dayNumber,
            sectionId: entry.sectionId,
            entries: entry.entries,
          });
        } else {
          await createLog(plan.id, {
            date: new Date().toISOString().split('T')[0],
            dayNumber: entry.dayNumber,
            sectionId: entry.sectionId,
            entries: entry.entries,
          });
        }
      }
      if (advance && onAdvancePhase) {
        await onAdvancePhase('EXECUTE');
      }
    } catch {
      alert('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
      onSaveComplete?.();
    }
  };

  const isEditable = plan.phase === 'HYDRATE';
  const isSetup = plan.phase === 'SETUP';
  const isExecute = plan.phase === 'EXECUTE';

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      {!isEditable && (
        <div className="mb-3 px-3 py-2 text-sm rounded-md border">
          {isSetup && (
            <div className="text-amber-700 bg-amber-50 border-amber-200 px-3 py-2 rounded-md">
              Schema editing is not possible in Setup phase. Click "Start Hydrating" to begin adding activities.
            </div>
          )}
          {isExecute && (
            <div className="text-blue-700 bg-blue-50 border-blue-200 px-3 py-2 rounded-md">
              Editing is not available in Execute phase. Switch to View tab for tracking.
            </div>
          )}
        </div>
      )}
      <div className={!isEditable ? 'opacity-60 pointer-events-none' : ''}>
        <MDXEditor
          key={plan.id}
          markdown={md}
          onChange={(newMd) => { if (isEditable) setCurrentMd(newMd); }}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            tablePlugin(),
          ]}
          contentEditableClassName="prose prose-sm max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-table:text-sm"
        />
      </div>
      <div className="flex gap-2 mt-4">
        {isEditable && (
          <>
            <Button onClick={() => handleSave(false)} disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </Button>
            <Button onClick={() => handleSave(true)} disabled={saving}>
              {saving ? 'Saving...' : 'Save & Start Tracking'}
            </Button>
          </>
        )}
        <Button onClick={handleExport} variant="secondary">
          Export
        </Button>
        {isSetup && onAdvancePhase && (
          <Button onClick={() => onAdvancePhase('HYDRATE')} className="ml-auto">
            Start Hydrating
          </Button>
        )}
      </div>
    </div>
  );
};

export default PlanMarkdownView;
