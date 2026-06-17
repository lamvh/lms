import type { IconName } from '../../components/Icon';

export interface NavItem {
  /** Route segment under /admin. */
  id: string;
  label: string;
  icon: IconName;
}

export interface NavGroup {
  group: string;
  items: NavItem[];
}

export const ADMIN_NAV: NavGroup[] = [
  {
    group: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      { id: 'classes', label: 'Classes', icon: 'classes' },
      { id: 'calendar', label: 'Timetable', icon: 'calendar' },
      { id: 'materials', label: 'Materials', icon: 'materials' },
    ],
  },
  {
    group: 'People',
    items: [
      { id: 'teachers', label: 'Teachers', icon: 'teachers' },
      { id: 'students', label: 'Students', icon: 'students' },
    ],
  },
];

/** Topbar title per first route segment under /admin. */
export const ADMIN_TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  classes: 'Classes',
  calendar: 'Timetable',
  materials: 'Materials',
  teachers: 'Teachers',
  students: 'Students',
  settings: 'Settings',
};
