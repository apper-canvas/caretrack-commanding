import { User, Moon, Sun, Menu, Heart, ArrowRight, Clock, Calendar, FileText, BarChart, Activity, DollarSign, 
  Users, Building, ChevronRight, Check, X as XIcon, AlertCircle, InfoIcon, Search, Plus, Edit, Trash2, Filter, Eye, UserPlus } from 'lucide-react';

// Map of icon names to their components
const iconMapping = {
  'user': User,
  'moon': Moon,
  'sun': Sun,
  'menu': Menu,
  'heart': Heart,
  'arrowright': ArrowRight,
  'clock': Clock,
  'calendar': Calendar,
  'filetext': FileText,
  'barchart': BarChart,
  'activity': Activity,
  'dollarsign': DollarSign,
  'users': Users,
  'building': Building,
  'chevronright': ChevronRight,
  'check': Check,
  'xicon': XIcon,
  'alertcircle': AlertCircle,
  'infoicon': InfoIcon,
  'search': Search,
  'plus': Plus,
  'edit': Edit,
  'trash2': Trash2,
  'filter': Filter,
  'eye': Eye,
  'userplus': UserPlus
};

export const getIcon = (iconName) => {
  // Handle null/undefined case
  if (!iconName) {
    console.warn('No icon name provided, using Smile as fallback');
    return User; // Using User as fallback instead of Smile which isn't imported
  }

  // Try direct match first using our iconMapping
  if (iconMapping[iconName]) {
    return iconMapping[iconName];
  }

  // For kebab-case, convert to lowercase without dashes
  const normalizedIconName = iconName.toLowerCase().replace(/-/g, '');
  if (iconMapping[normalizedIconName]) {
    return iconMapping[normalizedIconName];
  }

  // Handle PascalCase conversion
  let componentName = '';
  if (iconName.includes('-')) {
    componentName = iconName
      .split('-')
      .map(part => {
        if (/^\d+$/.test(part)) {
          return part;
        }
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join('');
  } else {
    componentName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  }
  
  // Try the transformed component name
  const noSpaces = componentName.replace(/[\s_]/g, '');
  const lowercaseNoSpaces = noSpaces.toLowerCase();
  
  if (iconMapping[lowercaseNoSpaces]) {
    return iconMapping[lowercaseNoSpaces];
  }

  // Special case for user-plus which becomes userplus
  if (iconName === 'user-plus') {
    return UserPlus;
  }

  // Fallback with console warning for debugging
  console.warn(`Icon "${iconName}" not found in Lucide (tried "${componentName}"), using Smile instead`);
  return User; // Using User as fallback
};