// components/Pages/Contact/Step2/Step2.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCode,
  faGlobe,
  faPaintBrush,
  faMobileAlt,
  faDatabase,
  faSearch,
  faCube,
  faBullhorn,
  faRobot,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Step2.module.scss';

interface Step2Props {
  servicesOptions: string[];
  formData: { services: string[] };
  handleServiceChange: (service: string) => void;
}

const SERVICE_META: Record<string, { icon: any; tagline: string }> = {
  'Software':          { icon: faCode,       tagline: 'Custom tools & platforms'   },
  'Website':           { icon: faGlobe,      tagline: 'Fast, modern web presence'  },
  'SEO Partnership':   { icon: faSearch,     tagline: 'Rank higher, grow faster'   },
  'Graphic Design':    { icon: faPaintBrush, tagline: 'Brand identity & print'     },
  'Mobile Apps':       { icon: faMobileAlt,  tagline: 'iOS & Android experiences'  },
  'Data Engineering':  { icon: faDatabase,   tagline: 'Pipelines & analytics'      },
  '3D Modeling':       { icon: faCube,       tagline: 'Visualization & renders'    },
  'Digital Marketing': { icon: faBullhorn,   tagline: 'Ads, social & campaigns'    },
  'AI Automations':    { icon: faRobot,      tagline: 'Save time with smart flows' },
};

const Step2: React.FC<Step2Props> = ({ servicesOptions, formData, handleServiceChange }) => {
  const count = formData.services.length;

  return (
    <div className={styles.step}>
      <p className={styles.selectionHint}>
        {count === 0
          ? 'Select everything that applies — no limit'
          : count === 1
          ? '1 selected — add more if you need them'
          : `${count} selected — looking great!`}
      </p>

      <div className={styles.grid}>
        {servicesOptions.map((service, i) => {
          const meta     = SERVICE_META[service];
          const selected = formData.services.includes(service);

          return (
            <button
              key={service}
              type="button"
              className={`${styles.card} ${selected ? styles.selected : ''}`}
              onClick={() => handleServiceChange(service)}
              aria-pressed={selected}
              style={{ animationDelay: `${i * 0.045}s` }}
            >
              <div className={styles.iconWrap}>
                <FontAwesomeIcon icon={meta.icon} className={styles.icon} />
              </div>
              <span className={styles.name}>{service}</span>
              <span className={styles.tagline}>{meta.tagline}</span>
              <div className={styles.checkDot} aria-hidden="true">
                {selected && <span className={styles.checkMark}>✓</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Step2;