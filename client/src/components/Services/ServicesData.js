// src/components/Services/ServicesData.js
import { Globe, Settings, Cpu } from 'lucide-react';

export const servicesData = [
  {
    id: 'web-development',
    icon: Globe,
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.2)',
    title: 'Web Development',
    tagline: 'Stunning, fast websites',
    description: 'We design and build responsive, high-performance websites and web applications using modern technologies.',
    details: [
      'Custom Website Design & Development',
      'E-Commerce Stores (WooCommerce, Shopify)',
      'MERN / MEAN Stack Applications',
      'WordPress & CMS Development',
      'Website Speed Optimization',
      'Ongoing Maintenance & Support',
    ],
  },
  {
    id: 'it-solutions',
    icon: Settings,
    color: '#9333ea',
    glow: 'rgba(147,51,234,0.2)',
    title: 'IT Solutions',
    tagline: 'Enterprise-grade tech',
    description: 'Robust IT infrastructure and custom software solutions tailored to streamline your business operations.',
    details: [
      'Custom Software Development',
      'System Integration & APIs',
      'Cloud Setup & Management',
      'Network Infrastructure',
      'IT Consulting & Support',
      'Data Management Solutions',
    ],
  },
  {
    id: 'iot-solutions',
    icon: Cpu,
    color: '#0ea5e9',
    glow: 'rgba(14,165,233,0.2)',
    title: 'IoT Solutions',
    tagline: 'Smart devices & automation',
    description: 'From academic IoT projects to industrial automation — we connect the physical and digital worlds.',
    details: [
      'Smart Home & Office Automation',
      'Industrial IoT Systems',
      'Academic & Research Projects',
      'Arduino / Raspberry Pi Development',
      'Sensor Data & Analytics',
      'Remote Monitoring Systems',
    ],
  },
];
