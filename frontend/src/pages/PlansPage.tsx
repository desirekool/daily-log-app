import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlan, updatePlanAndReturn, updatePlanPhaseAndReturn, updatePlanPhase } from '../services/planService';
import { createLog, updateLog } from '../services/logService';
import { Plan, DailyLog, SectionProgress } from '../types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Button } from '../components/ui/button';
import LogModal from '../components/logs/LogModal';
import TrackerCell from '../components/logs/TrackerCell';
import PlanMarkdownView from '../components/plans/PlanMarkdownView';
import PlanModal from '../components/plans/PlanModal';

const PHASE_LABELS: Record<string, string> = {
  SETUP: 'Setup',
  HYDRATE: 'Hydrate',
  EXECUTE: 'Execute',
  REVIEW: 'Review',
};

const PlansPage: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [progressMap, setProgressMap] = useState<Map<number, SectionProgress>>(new Map());
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  const [logModal, setLogModal] = useState<{ sectionId: number; log?: DailyLog | null; dayNumber: number } | null>(null);
  const [schemaModalOpen, setSchemaModalOpen] = useState(false);

  const pid = planId ? parseInt(planId) : 0;

  const fetchPlan = useCallback(() => {
    if (!pid) return;
    getPlan(pid).then((data: Plan) => {
      setPlan(data);
    });
  }, [pid]);

  useEffect(() => { fetchPlan(); }, [pid, fetchPlan]);

  const initialExpandDone = useRef(false);

  useEffect(() => {
    if (plan?.sections && plan.sections.length > 0 && !initialExpandDone.current) {
      setExpandedSections(new Set(plan.sections.map((s) => s.id)));
      initialExpandDone.current = true;
    }
  }, [plan]);

  const toggleSection = (id: number) => {
    const next = new Set(expandedSections);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpandedSections(next);
  };

  const checkAutoPushToReview = (updatedPlan: Plan) => {
    if (updatedPlan.phase !== 'EXECUTE') return;
    const allLogs = updatedPlan.dailyLogs || [];
    if (allLogs.length === 0) return;
    const trackerCol = updatedPlan.columns?.find((c) => c.isTracker);
    if (!trackerCol) return;
    const allComplete = allLogs.every((log) =>
      log.logEntries?.some((e) => e.planColumnId === trackerCol.id && e.entryValue === '[x]')
    );
    if (allComplete) {
      updatePlanPhase(updatedPlan.id, 'REVIEW').then(fetchPlan).catch(() => {});
    }
  };

  const handleSaveLog = async (data: { date: string; dayNumber: number; sectionId: number; entries: { [key: number]: string }; comment?: string }) => {
    if (!plan) return;
    try {
      if (logModal?.log) {
        await updateLog(plan.id, logModal.log.id, data);
      } else {
        await createLog(plan.id, data);
      }
      setLogModal(null);
      const updated = await getPlan(plan.id);
      setPlan(updated);
      checkAutoPushToReview(updated);
    } catch {
      alert('Failed to save log entry.');
    }
  };

  const NEXT_PHASE: Record<string, string> = {
    SETUP: 'HYDRATE',
    HYDRATE: 'EXECUTE',
  };

  const handleSaveSchema = async (data: any, advance?: boolean) => {
    if (!plan) return;
    try {
      const result = await updatePlanAndReturn(plan.id, advance ? { ...data, phase: NEXT_PHASE[plan.phase] || plan.phase } : data);
      setPlan(result.plan);
      const pm = new Map<number, SectionProgress>();
      result.sectionProgress.forEach((p: SectionProgress) => pm.set(p.sectionId, p));
      setProgressMap(pm);
      setSchemaModalOpen(false);
    } catch {
      alert('Failed to save schema.');
    }
  };

  const handleAdvancePhase = async (nextPhase: string) => {
    if (!plan) return;
    try {
      const result = await updatePlanPhaseAndReturn(plan.id, nextPhase);
      setPlan(result.plan);
      const pm = new Map<number, SectionProgress>();
      result.sectionProgress.forEach((p: SectionProgress) => pm.set(p.sectionId, p));
      setProgressMap(pm);
    } catch {
      alert('Failed to advance phase.');
    }
  };

  const sortedColumns = [...(plan?.columns || [])].sort((a, b) => {
    if (a.isTracker !== b.isTracker) return a.isTracker ? 1 : -1;
    return a.position - b.position;
  });

  const isReadOnly = plan?.phase === 'HYDRATE' || plan?.phase === 'REVIEW';
  const isReview = plan?.phase === 'REVIEW';
  const isSetup = plan?.phase === 'SETUP';
  const isExecute = plan?.phase === 'EXECUTE';
  const isHydrate = plan?.phase === 'HYDRATE';

  if (!plan) {
    return <div className="text-center py-12 text-muted-foreground">Select a plan from the sidebar</div>;
  }

  return (
    <div>
      <Tabs defaultValue={isSetup ? 'edit' : 'view'} className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-foreground">{plan.name}</h2>
            <span className="text-xs uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {PHASE_LABELS[plan.phase] || plan.phase}
            </span>
          </div>
          {plan.description && <p className="text-muted-foreground text-sm mt-1">{plan.description}</p>}
        </div>
        <div className="flex items-center gap-2">
          {isExecute && (
            <Button variant="outline" size="sm" onClick={() => handleAdvancePhase('REVIEW')}>
              Mark All Complete
            </Button>
          )}
          {!isReview && (
            <Button variant="outline" size="sm" onClick={() => setSchemaModalOpen(true)}>
              Edit Schema
            </Button>
          )}
          <TabsList>
            <TabsTrigger value="view">👁 View</TabsTrigger>
            {!isReview && <TabsTrigger value="edit">✏ Edit</TabsTrigger>}
          </TabsList>
        </div>
      </div>

      {isHydrate && (
        <div className="mb-4 px-4 py-2 text-sm bg-blue-50 text-blue-700 rounded-md border border-blue-200">
          View mode is read-only during Hydrate phase. Use the Edit tab to add activities.
        </div>
      )}

      {isSetup && (
        <div className="mb-4 px-4 py-2 text-sm bg-amber-50 text-amber-700 rounded-md border border-amber-200">
          This plan is in Setup phase. Define the schema then use the Edit tab to start adding activities.
        </div>
      )}

      {isReview && (
        <div className="mb-4 px-4 py-2 text-sm bg-green-50 text-green-700 rounded-md border border-green-200">
          This plan is in Review phase. All data is read-only.
        </div>
      )}

      <TabsContent value="view">
          {isSetup ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg mb-2">This plan is in Setup mode</p>
              <p className="text-sm">Switch to the Edit tab to advance to Hydrate mode and start adding activities.</p>
            </div>
          ) : plan.sections?.sort((a, b) => a.position - b.position).map((section) => {
            const progress = progressMap.get(section.id);
            const sectionLogs = plan.dailyLogs?.filter((l) => l.sectionId === section.id) || [];
            const isExpanded = expandedSections.has(section.id);

            return (
              <Card key={section.id} className="mb-4">
                <div
                  className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-accent/50 rounded-t-lg"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{section.name}</h3>
                    {section.description && <p className="text-xs text-muted-foreground">{section.description}</p>}
                    {progress && (
                      <div className="mt-2 flex items-center gap-2">
                        <Progress value={progress.totalLogs > 0 ? (progress.completedLogs / progress.totalLogs) * 100 : 0} className="h-2" />
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {progress.completedLogs}/{progress.totalLogs}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-muted-foreground ml-3">{isExpanded ? '▲' : '▼'}</span>
                </div>

                {isExpanded && (
                  <div className="border-t border-border">
                    {sectionLogs.length === 0 ? (
                      <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                        {isHydrate
                          ? 'Use the Edit tab to add activities.'
                          : 'No entries yet.'}
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              {sortedColumns.map((col) => (
                                <TableHead key={col.id}>{col.name}</TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {sectionLogs.sort((a, b) => a.dayNumber - b.dayNumber).map((log) => {
                              const entryMap = new Map<number, string>();
                              log.logEntries?.forEach((e) => entryMap.set(e.planColumnId, e.entryValue));

                              return (
                                <TableRow key={log.id}>
                                  {sortedColumns.map((col) => (
                                    <TableCell key={col.id}>
                                      {col.isTracker ? (
                                        <TrackerCell
                                          logEntries={log.logEntries || []}
                                          trackerColumnId={col.id}
                                          comment={log.comment}
                                          onClick={isReadOnly ? undefined : () => setLogModal({ sectionId: section.id, log, dayNumber: log.dayNumber })}
                                        />
                                      ) : (
                                        <span className="line-clamp-2">{entryMap.get(col.id) || ''}</span>
                                      )}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </TabsContent>

      <TabsContent value="edit">
        {isReview ? null : (
          <PlanMarkdownView plan={plan} onSaveComplete={fetchPlan} onAdvancePhase={handleAdvancePhase} />
        )}
      </TabsContent>
    </Tabs>

      {logModal && isExecute && (
        <LogModal
          columns={sortedColumns}
          log={logModal.log}
          dayNumber={logModal.dayNumber}
          sectionId={logModal.sectionId}
          onSave={(data) => handleSaveLog(data)}
          onClose={() => setLogModal(null)}
        />
      )}

      {schemaModalOpen && (
        <PlanModal
          plan={plan}
          readOnly={isReview || isExecute}
          onSave={isSetup || isHydrate ? handleSaveSchema : () => {}}
          onClose={() => setSchemaModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PlansPage;
