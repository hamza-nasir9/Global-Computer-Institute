import {
  Code2, Brain, Palette, Smartphone, ShieldCheck, Cloud,
  BarChart3, Video, BadgeCheck, TrendingUp, Building2, Globe,
  FlaskConical, Users, GraduationCap, BookOpen, Briefcase,
  Handshake, Trophy, ClipboardList, PhoneCall, FileText,
  CreditCard, Sparkles, Target, Eye, Lightbulb, Award, Heart,
  CheckCircle, ArrowRight, MapPin, Mail, Phone,
} from 'lucide-react';

const ICON_MAP = {
  Code2, Brain, Palette, Smartphone, ShieldCheck, Cloud,
  BarChart3, Video, BadgeCheck, TrendingUp, Building2, Globe,
  FlaskConical, Users, GraduationCap, BookOpen, Briefcase,
  Handshake, Trophy, ClipboardList, PhoneCall, FileText,
  CreditCard, Sparkles, Target, Eye, Lightbulb, Award, Heart,
  CheckCircle, ArrowRight, MapPin, Mail, Phone,
};

export function getIcon(name) {
  return ICON_MAP[name] ?? Sparkles;
}
