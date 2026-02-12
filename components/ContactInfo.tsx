'use client';

import { useState, useEffect } from 'react';

export interface ContactInfoData {
  id: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string | null;
  linkedin: string | null;
  github: string | null;
}

interface ContactInfoProps {
  variant?: 'default' | 'footer' | 'sidebar' | 'card';
  showTitle?: boolean;
  className?: string;
}

export default function ContactInfo({ 
  variant = 'default', 
  showTitle = true, 
  className = '' 
}: ContactInfoProps) {
  const [contactInfo, setContactInfo] = useState<ContactInfoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await fetch('/api/contact-info');
      if (response.ok) {
        const data = await response.json();
        setContactInfo(data);
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  if (!contactInfo) {
    return null;
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'footer':
        return {
          container: 'text-gray-400',
          title: 'text-xs font-bold mb-10 text-white uppercase tracking-[0.2em]',
          item: 'flex items-start space-x-4 mb-6',
          icon: 'w-5 h-5 mt-0.5 text-[#65a30d]',
          text: 'text-gray-500 text-sm font-bold uppercase tracking-widest',
          link: 'text-gray-500 hover:text-[#65a30d] transition-all text-sm font-bold uppercase tracking-widest'
        };
      case 'sidebar':
        return {
          container: 'bg-[#1a1a1a] p-8 border border-white/5',
          title: 'text-sm font-black mb-6 text-white uppercase tracking-[0.2em]',
          item: 'flex items-start space-x-4 mb-6',
          icon: 'w-5 h-5 mt-0.5 text-[#65a30d]',
          text: 'text-gray-400 text-sm font-medium',
          link: 'text-[#65a30d] hover:underline'
        };
      case 'card':
        return {
          container: 'bg-[#1a1a1a] p-10 shadow-2xl border border-white/5',
          title: 'text-xl font-black text-white mb-8 uppercase tracking-widest',
          item: 'flex items-start space-x-6 mb-8',
          icon: 'w-6 h-6 mt-0.5 text-[#65a30d]',
          text: 'text-gray-400 text-lg',
          link: 'text-[#65a30d] hover:text-white transition-colors font-bold'
        };
      default:
        return {
          container: '',
          title: 'text-lg font-bold mb-6 text-white',
          item: 'flex items-start space-x-4 mb-4',
          icon: 'w-5 h-5 mt-0.5 text-[#65a30d]',
          text: 'text-gray-400 text-sm',
          link: 'text-[#65a30d] hover:underline'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.container} ${className}`}>
      {showTitle && (
        <h3 className={styles.title}>
          Contact Information
        </h3>
      )}
      
      <div className="space-y-1">
        {/* Address */}
        <div className={styles.item}>
          <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <div className={styles.text}>
              {contactInfo.address.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className={styles.item}>
          <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <div>
            <a href={`tel:${contactInfo.phone}`} className={styles.link}>
              {contactInfo.phone}
            </a>
          </div>
        </div>

        {/* Email */}
        <div className={styles.item}>
          <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <div>
            <a href={`mailto:${contactInfo.email}`} className={styles.link}>
              {contactInfo.email}
            </a>
          </div>
        </div>

        {/* Working Hours */}
        {contactInfo.workingHours && (
          <div className={styles.item}>
            <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <div className={styles.text}>
                {contactInfo.workingHours}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}