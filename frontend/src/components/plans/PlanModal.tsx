import React, { useState } from 'react';
import { Plan } from '../../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import ColumnHeaderEditor, { ColumnDef } from './ColumnHeaderEditor';
import SectionListEditor, { SectionDef } from './SectionListEditor';

interface PlanFormData {
  name: string;
  description: string;
  sections: { name: string; description: string; position: number }[];
  columns: { name: string; description: string; type: string; isTracker: boolean; position: number }[];
}

const NEXT_LABEL: Record<string, string> = {
  SETUP: 'Save & Start Hydrating',
  HYDRATE: 'Save & Start Tracking',
};

interface Props {
  plan?: Plan | null;
  readOnly?: boolean;
  onSave: (data: PlanFormData, advance?: boolean) => void;
  onClose: () => void;
}

function initColumns(plan?: Plan | null): ColumnDef[] {
  const cols = plan?.columns
    ?.filter((c) => !c.isTracker)
    .sort((a, b) => a.position - b.position)
    .map((c) => ({ id: crypto.randomUUID(), name: c.name }));
  if (cols && cols.length > 0) return cols;
  return [
    { id: crypto.randomUUID(), name: 'Day' },
    { id: crypto.randomUUID(), name: 'Task' },
  ];
}

function initSections(plan?: Plan | null): SectionDef[] {
  const secs = plan?.sections
    ?.sort((a, b) => a.position - b.position)
    .map((s) => ({ id: crypto.randomUUID(), name: s.name }));
  if (secs && secs.length > 0) return secs;
  return [];
}

const PlanModal: React.FC<Props> = ({ plan, readOnly, onSave, onClose }) => {
  const [name, setName] = useState(plan?.name || '');
  const [description, setDescription] = useState(plan?.description || '');
  const [editorColumns, setEditorColumns] = useState<ColumnDef[]>(() => initColumns(plan));
  const [editorSections, setEditorSections] = useState<SectionDef[]>(() => initSections(plan));

  const buildData = (): PlanFormData => ({
    name,
    description,
    sections: editorSections.map((s, i) => ({ name: s.name, description: '', position: i })),
    columns: [
      ...editorColumns.map((c, i) => ({
        name: c.name,
        description: '',
        type: 'text' as const,
        isTracker: false,
        position: i,
      })),
      {
        name: 'Tracker',
        description: 'Completion status',
        type: 'checkbox' as const,
        isTracker: true,
        position: editorColumns.length,
      },
    ],
  });

  const handleSubmit = (advance?: boolean) => {
    onSave(buildData(), advance);
  };

  const inputClass = readOnly ? 'opacity-60 pointer-events-none' : '';
  const displayPhase = plan?.phase || 'SETUP';

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle>{plan ? 'Plan Schema' : 'Create New Plan'}</DialogTitle>
            {plan && (
              <span className="text-xs uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {displayPhase}
              </span>
            )}
          </div>
        </DialogHeader>
        <form className="space-y-6">
          <div className={`space-y-2 ${inputClass}`}>
            <Label htmlFor="planName">Plan Name</Label>
            <Input id="planName" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., 100 Days Spring Boot" readOnly={readOnly} />
          </div>
          <div className={`space-y-2 ${inputClass}`}>
            <Label htmlFor="planDesc">Description</Label>
            <Textarea id="planDesc" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="Brief description of your plan" readOnly={readOnly} />
          </div>

          <div className="space-y-2">
            <Label>Columns</Label>
            <ColumnHeaderEditor columns={editorColumns} onChange={setEditorColumns} readOnly={readOnly} />
          </div>

          <div className="space-y-2">
            <Label>Sections</Label>
            <SectionListEditor sections={editorSections} onChange={setEditorSections} readOnly={readOnly} />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>{readOnly ? 'Close' : 'Cancel'}</Button>
            {!readOnly && (
              <>
                <Button type="button" variant="outline" onClick={() => handleSubmit(false)}>Save</Button>
                <Button type="button" onClick={() => handleSubmit(true)}>
                  {plan ? (NEXT_LABEL[plan.phase || 'SETUP'] || 'Save & Next') : 'Create Plan'}
                </Button>
              </>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlanModal;
