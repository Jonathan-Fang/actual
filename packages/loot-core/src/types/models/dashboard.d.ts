import { type CustomReportEntity } from './reports';

type AbstractWidget<
  T extends string,
  Meta extends Record<string, unknown> = null,
> = {
  id: string;
  type: T;
  x: number;
  y: number;
  width: number;
  height: number;
  meta: Meta;
  tombstone: boolean;
};

type NetWorthWidget = AbstractWidget<'net-worth-card'>;
type CashFlowWidget = AbstractWidget<'cash-flow-card'>;
type SpendingWidget = AbstractWidget<'spending-card'>;
export type CustomReportWidget = AbstractWidget<
  'custom-report',
  { id: string }
>;

export type SpecializedWidget =
  | NetWorthWidget
  | CashFlowWidget
  | SpendingWidget;
export type Widget = SpecializedWidget | CustomReportWidget;

// Exported/imported (json) widget definition
export type ExportImportCustomReportWidget = Omit<
  Widget,
  'meta' | 'type' | 'tombstone'
> & {
  type: CustomReportWidget['type'];
  meta: Omit<CustomReportEntity, 'tombstone'>;
};
export type ExportImportDashboardWidget =
  | ExportImportCustomReportWidget
  | (Omit<Widget, 'meta' | 'type' | 'tombstone'> & {
      type: SpecializedWidget['type'];
    });

export type ExportImportDashboard = {
  version: 1;
  widgets: ExportImportDashboardWidget[];
};