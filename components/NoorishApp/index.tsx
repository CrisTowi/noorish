'use client';

import { useEffect, useState } from 'react';
import { ErrorBoundary } from '../ErrorBoundary';
import { Onboarding } from '../Onboarding';
import { TodayScreen, type EatenMap, type MealLog, type DayBadge } from '../TodayScreen';
import { PlanScreen } from '../PlanScreen';
import { ShopScreen } from '../ShopScreen';
import { SavedScreen, type FavsMap } from '../SavedScreen';
import { ProfileScreen, type WeekBadge, type DayBadge as ProfileDayBadge } from '../ProfileScreen';
import { MealSheet } from '../MealSheet';
import { Celebration } from '../Celebration';
import { NavBtn } from '../NavBtn';
import { BadgeCircle } from '../BadgeCircle';
import { Icon, type IconName } from '../Icon';
import { usePersistedState } from '../lib/persistence';
import { MEAL_TYPES, type MealType } from '../lib/types';
import type { ProgramId } from '../lib/programs';
import type { Meal } from '../lib/meals';
import styles from './NoorishApp.module.css';

type NavId = 'today' | 'plan' | 'shop' | 'saved' | 'profile';

type Toast =
  | { type: 'badge'; num: number }
  | { type: 'saved'; name: string }
  | { type: 'unsaved'; name: string }
  | { type: 'day'; day: string }
  | { type: 'quit' };

interface Sheet {
  meal: Meal;
  type: MealType;
}

const NAV_ITEMS: { id: NavId; label: string; icon: IconName }[] = [
  { id: 'today', label: 'Today', icon: 'house' },
  { id: 'plan', label: 'Plan', icon: 'calendar' },
  { id: 'shop', label: 'Shop', icon: 'bag' },
  { id: 'saved', label: 'Saved', icon: 'bookmark' },
];

function AppInner() {
  const [onboarded, setOnboarded] = usePersistedState<boolean>('onboarded', false);
  const [userName, setUserName] = usePersistedState<string>('userName', '');
  const [, setUserPrefs] = usePersistedState<string[]>('userPrefs', []);
  const [tab, setTab] = useState<NavId>('today');
  const [eaten, setEaten] = usePersistedState<EatenMap>('eaten', {
    breakfast: false,
    lunch: false,
    snack: false,
    dinner: false,
  });
  const [favs, setFavs] = usePersistedState<FavsMap>('favs', {});
  const [badges, setBadges] = usePersistedState<WeekBadge[]>('badges', []);
  const [dayBadges, setDayBadges] = usePersistedState<DayBadge[]>('dayBadges', []);
  const [dayBadgeClaimed, setDayBadgeClaimed] = usePersistedState<boolean>('dayBadgeClaimed', false);
  const [showCel, setShowCel] = useState(false);
  const [deferred, setDeferred] = useState(false);
  const [deferredClosing, setDeferredClosing] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [toastClosing, setToastClosing] = useState(false);
  const [activeProgram, setActiveProgram] = usePersistedState<ProgramId>('activeProgram', 'hormone');
  const [mealLog, setMealLog] = usePersistedState<MealLog>('mealLog', {});
  const [sheet, setSheet] = useState<Sheet | null>(null);

  const allEaten = MEAL_TYPES.every((t) => eaten[t]);

  function dismissDeferred() {
    setDeferredClosing(true);
    setTimeout(() => {
      setDeferred(false);
      setDeferredClosing(false);
    }, 300);
  }

  function dismissToast() {
    setToastClosing(true);
    setTimeout(() => {
      setToast(null);
      setToastClosing(false);
    }, 300);
  }

  useEffect(() => {
    if (allEaten && !dayBadgeClaimed) {
      const t = setTimeout(() => {
        const dayName = new Date().toLocaleDateString('en-US', { weekday: 'short' });
        const dayFull = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        setDayBadges((p) => p.concat([{ day: dayName, earnedAt: Date.now() }]));
        setDayBadgeClaimed(true);
        setToast({ type: 'day', day: dayFull });
        setTimeout(dismissToast, 5000);
      }, 400);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [allEaten, dayBadgeClaimed, setDayBadges, setDayBadgeClaimed]);

  useEffect(() => {
    if (dayBadges.length > 0 && dayBadges.length % 7 === 0 && !showCel && !deferred) {
      const t = setTimeout(() => setShowCel(true), 800);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [dayBadges.length, showCel, deferred]);

  function handleOnboardingComplete(data: { name: string; program: string; prefs: string[] }) {
    setUserName(data.name);
    setUserPrefs(data.prefs);
    setActiveProgram(data.program as ProgramId);
    setOnboarded(true);
  }

  function handleCollect() {
    const nextVariant = badges.length % 7;
    setBadges((p) => p.concat([{ protein: 840, calories: 12600, meals: 28, variant: nextVariant }]));
    setShowCel(false);
    setDeferred(false);
    setEaten({ breakfast: false, lunch: false, snack: false, dinner: false });
    setDayBadgeClaimed(false);
    const num = badges.length + 1;
    setToast({ type: 'badge', num });
    setTimeout(dismissToast, 5000);
  }

  function handleDismiss() {
    setShowCel(false);
    setDeferred(true);
  }

  function handleQuitPlan() {
    setBadges([]);
    setDayBadges([]);
    setDayBadgeClaimed(false);
    setEaten({ breakfast: false, lunch: false, snack: false, dinner: false });
    setDeferred(false);
    setShowCel(false);
    setToast({ type: 'quit' });
    setTimeout(dismissToast, 5000);
  }

  if (!onboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const nextVariant = badges.length % 7;

  return (
    <div className={styles.app}>
      <div className={styles.topBar}>
        <div className={styles.brand}>noorish</div>
        <button
          type="button"
          onClick={() => setTab('profile')}
          className={badges.length > 0 ? styles.profileBtnOn : styles.profileBtn}
          aria-label="Profile"
        >
          {badges.length > 0 ? (
            <span className={styles.badgeCount}>{badges.length}</span>
          ) : (
            <Icon name="user" size={15} />
          )}
          {badges.length > 0 && <span className={styles.badgeDot} />}
        </button>
      </div>

      <div className={styles.scroll}>
        {tab === 'today' && (
          <TodayScreen
            eaten={eaten}
            setEaten={setEaten}
            mealLog={mealLog}
            setMealLog={setMealLog}
            dayBadges={dayBadges}
            setDayBadges={setDayBadges}
            setDayBadgeClaimed={setDayBadgeClaimed}
            setShowCel={setShowCel}
            userName={userName}
            onMeal={(m, t) => setSheet({ meal: m, type: t })}
          />
        )}
        {tab === 'plan' && (
          <PlanScreen
            onMeal={(m, t) => setSheet({ meal: m, type: t })}
            activeProgram={activeProgram}
            setActiveProgram={setActiveProgram}
            onQuit={handleQuitPlan}
          />
        )}
        {tab === 'shop' && <ShopScreen mealLog={mealLog} mealOverrides={{}} activeProgram={activeProgram} />}
        {tab === 'saved' && (
          <SavedScreen
            favs={favs}
            setFavs={setFavs}
            onMeal={(m, t) => setSheet({ meal: m, type: t })}
          />
        )}
        {tab === 'profile' && (
          <ProfileScreen badges={badges} dayBadges={dayBadges as ProfileDayBadge[]} />
        )}
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((n) => (
          <NavBtn
            key={n.id}
            icon={n.icon}
            label={n.label}
            active={tab === n.id}
            onClick={() => setTab(n.id)}
          />
        ))}
      </nav>

      {sheet && (
        <MealSheet
          meal={sheet.meal}
          mealType={sheet.type}
          favs={favs}
          setFavs={setFavs}
          onClose={() => setSheet(null)}
          onSaveToast={(saved, name) => {
            setToast({ type: saved ? 'saved' : 'unsaved', name });
            setTimeout(dismissToast, 4000);
          }}
        />
      )}

      {showCel && (
        <Celebration
          weekNum={badges.length + 1}
          variant={nextVariant}
          onCollect={handleCollect}
          onDismiss={handleDismiss}
        />
      )}

      {deferred && !showCel && (
        <div className={styles.deferredWrap}>
          <div
            className={`${styles.deferredCard} ${deferredClosing ? styles.deferredClosing : ''}`}
          >
            <BadgeCircle variant={nextVariant} size={36} animate={true} />
            <div className={styles.deferredBody}>
              <div className={styles.deferredTitle}>Your badge is waiting</div>
              <div className={styles.deferredSub}>Collect it whenever you&apos;re ready</div>
            </div>
            <button
              type="button"
              onClick={() => {
                dismissDeferred();
                setTimeout(() => setShowCel(true), 310);
              }}
              className={styles.deferredCta}
            >
              Collect
            </button>
            <button
              type="button"
              onClick={dismissDeferred}
              className={styles.deferredDismiss}
              aria-label="Dismiss"
            >
              <Icon name="x" size={14} />
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className={styles.toastWrap}>
          <div className={`${styles.toastCard} ${toastClosing ? styles.toastClosing : ''}`}>
            {toast.type === 'badge' && <BadgeCircle variant={(toast.num - 1) % 7} size={36} animate={true} />}
            {toast.type === 'day' && (
              <div className={styles.toastIconOlive}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M9 15l-2 6h10l-2-6" />
                </svg>
              </div>
            )}
            {toast.type === 'quit' && (
              <div className={styles.toastIconQuit}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </div>
            )}
            {(toast.type === 'saved' || toast.type === 'unsaved') && (
              <div className={styles.toastIconOlive}>
                <Icon name="bookmark" size={16} />
              </div>
            )}
            <div className={styles.toastBody}>
              {toast.type === 'badge' && (
                <>
                  <div className={styles.toastTitle}>Badge #{toast.num} collected!</div>
                  <div className={styles.toastSub}>Keep going — next badge awaits</div>
                </>
              )}
              {toast.type === 'saved' && (
                <>
                  <div className={styles.toastTitle}>Saved to favourites</div>
                  <div className={styles.toastName}>{toast.name}</div>
                </>
              )}
              {toast.type === 'day' && (
                <>
                  <div className={styles.toastTitle}>{toast.day} badge earned!</div>
                  <div className={styles.toastSub}>All meals done. Keep it up.</div>
                </>
              )}
              {toast.type === 'quit' && (
                <>
                  <div className={styles.toastTitle}>Plan switched</div>
                  <div className={styles.toastSub}>Progress reset. Fresh start.</div>
                </>
              )}
              {toast.type === 'unsaved' && (
                <>
                  <div className={styles.toastTitle}>Removed from saved</div>
                  <div className={styles.toastName}>{toast.name}</div>
                </>
              )}
            </div>
            {toast.type === 'badge' && (
              <button
                type="button"
                onClick={() => {
                  dismissToast();
                  setTimeout(() => setTab('profile'), 310);
                }}
                className={styles.toastCta}
              >
                Profile
              </button>
            )}
            {toast.type === 'saved' && (
              <button
                type="button"
                onClick={() => {
                  dismissToast();
                  setTimeout(() => {
                    setTab('saved');
                    setSheet(null);
                  }, 310);
                }}
                className={styles.toastCta}
              >
                View
              </button>
            )}
            <button
              type="button"
              onClick={dismissToast}
              className={styles.toastDismiss}
              aria-label="Dismiss"
            >
              <Icon name="x" size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function NoorishApp() {
  return (
    <ErrorBoundary>
      <AppInner />
    </ErrorBoundary>
  );
}
