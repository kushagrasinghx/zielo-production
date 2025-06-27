import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type CampaignEvent = {
  title: string;
  description: string;
  date: string;
  subtitle: string;
};

const campaignEvents = [
  {
    title: 'World Environment Day',
    description: 'Raise awareness & encourage eco-friendly action',
    date: '2025-06-05',
    subtitle: 'Green Together',
  },
  {
    title: "Father's Day",
    description: 'Boost engagement, emotional storytelling, gift campaigns',
    date: '2025-06-15',
    subtitle: "Dad, You're the Best",
  },
  {
    title: 'World Mental Health Day',
    description: 'Raise awareness about mental health and promote wellness-related products, services, or initiatives.',
    date: '2025-07-10',
    subtitle: 'Mind Matters',
  },
  {
    title: "Singles' Day",
    description: 'Turn the biggest global shopping day into a self-love and personal reward celebration.',
    date: '2025-08-11',
    subtitle: 'Celebrate You',
  },
  {
    title: 'Black Friday',
    description: 'The biggest shopping event of the year. Flash sales, exclusive deals, and more.',
    date: '2025-11-28',
    subtitle: 'Shop & Save',
  },
  {
    title: 'Cyber Monday',
    description: 'Online exclusive deals and tech promotions.',
    date: '2025-12-01',
    subtitle: 'Tech Frenzy',
  },
  {
    title: 'Christmas',
    description: 'Holiday campaigns, gifting, and festive promotions.',
    date: '2025-12-25',
    subtitle: 'Festive Cheer',
  },
  {
    title: 'New Year',
    description: 'Celebrate the new year with special offers and campaigns.',
    date: '2026-01-01',
    subtitle: 'New Beginnings',
  },
];

const calendarEvents = campaignEvents.map(event => ({
  title: event.title,
  date: event.date,
  extendedProps: {
    subtitle: event.subtitle,
    description: event.description,
    type: 'campaign',
  },
}));

const BrandDashboard: React.FC = () => {
  const calendarRef = useRef<any>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CampaignEvent | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);

  // Helper to get month/year options
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const years = Array.from({ length: 6 }, (_, i) => 2024 + i);

  const handleMonthYearChange = (monthIdx: number, year: number) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(year);
    newDate.setMonth(monthIdx);
    setSelectedDate(newDate);
    setPickerOpen(false);
    // Use FullCalendar API to change date
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(newDate);
    }
  };

  function handleEventClick(event: CampaignEvent) {
    setSelectedEvent(event);
    setShowEventDialog(true);
  }

  function closeEventDialog() {
    setShowEventDialog(false);
    setSelectedEvent(null);
  }

  return (
    <div className="flex flex-col md:flex-row w-full gap-6 md:gap-6 font-sans px-2 md:px-0">
      {/* Sidebar */}
      <aside className="w-full md:w-80 h-[400px] md:h-[700px] bg-card text-card-foreground rounded-xl p-4 shadow-sm flex flex-col gap-4 border mb-4 md:mb-0">
        <h2 className="font-semibold text-sm mb-2">Upcoming Campaign Event</h2>
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
          {campaignEvents.map((event, idx) => (
            <div
              key={event.title}
              className="border rounded-xl p-3 hover:shadow transition bg-muted/40 cursor-pointer"
              onClick={() => handleEventClick(event)}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">{event.title}</span>
              </div>
              <div className="text-xs font-semibold mt-1">{event.subtitle}</div>
              <div className="text-xs text-muted-foreground mt-1">{event.description}</div>
              <div className="text-xs text-muted-foreground mt-2">{new Date(event.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            </div>
          ))}
        </div>
      </aside>
      {/* Calendar */}
      <main className="flex-1 flex flex-col items-center">
        <style>{`
          .fc .fc-button {
            background: #fff !important;
            color: #000 !important;
            border-radius: 0.5rem !important;
            font-size: 0.875rem !important;
            padding: 0.25rem 1rem !important;
            min-width: 2.25rem !important;
            min-height: 2.25rem !important;
            box-shadow: none !important;
            border: 1px solid var(--color-border) !important;
            transition: background 0.2s, color 0.2s, border 0.2s;
          }
          .fc .fc-button.fc-button-active, .fc .fc-button:active, .fc .fc-button:focus {
            background: #f4f4f5 !important;
            color: #000 !important;
            border: 1.5px solid var(--color-primary) !important;
            opacity: 1;
          }
          .fc .fc-button:hover {
            background: #f4f4f5 !important;
            color: #000 !important;
            border: 1.5px solid var(--color-primary) !important;
          }
          .fc .fc-toolbar-title {
            font-size: 1.1rem !important;
            font-weight: 500 !important;
            color: var(--color-foreground) !important;
          }
          .fc .fc-toolbar {
            border-radius: 0.75rem 0.75rem 0 0 !important;
          }
          .fc .fc-scrollgrid,
          .fc .fc-view-harness {
            border-radius: 0.75rem !important;
            overflow: hidden;
            background: #fff;
            border: 1px solid var(--color-border);
          }
          /* Remove all blue backgrounds from FullCalendar events */
          .fc .fc-event, .fc .fc-daygrid-event, .fc .fc-daygrid-event-dot {
            background: transparent !important;
            box-shadow: none !important;
            border: none !important;
            color: inherit !important;
          }
        `}</style>
        <div className="w-full max-w-5xl mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 px-0 sm:px-2 gap-2 sm:gap-0">
            <div className="text-lg font-medium text-foreground w-full sm:w-auto text-left sm:text-center">{months[selectedDate.getMonth()]} {selectedDate.getFullYear()}</div>
            <div className="flex gap-2 items-center w-full sm:w-auto justify-end">
              <button className="bg-white border border-border rounded-md px-3 py-1 text-black hover:bg-muted" onClick={() => calendarRef.current?.getApi().prev()}>←</button>
              <select
                className="border rounded px-2 py-1 mx-1 text-black bg-white"
                value={selectedDate.getMonth()}
                onChange={e => handleMonthYearChange(Number(e.target.value), selectedDate.getFullYear())}
              >
                {months.map((m, idx) => <option key={m} value={idx}>{m}</option>)}
              </select>
              <select
                className="border rounded px-2 py-1 text-black bg-white"
                value={selectedDate.getFullYear()}
                onChange={e => handleMonthYearChange(selectedDate.getMonth(), Number(e.target.value))}
              >
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <button className="bg-white border border-border rounded-md px-3 py-1 text-black hover:bg-muted" onClick={() => calendarRef.current?.getApi().next()}>→</button>
            </div>
          </div>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={false}
            events={calendarEvents}
            height={700}
            dayMaxEventRows={2}
            eventContent={renderEventContent}
            dayHeaderClassNames={() => 'bg-muted text-muted-foreground font-medium text-sm py-2'}
            dayCellClassNames={() => 'bg-background border border-border text-foreground font-normal text-sm'}
            fixedWeekCount={false}
            titleFormat={{ year: 'numeric', month: 'long' }}
          />
        </div>
      </main>
      {/* Event Popup Dialog (shadcn Dialog) */}
      <Dialog open={showEventDialog} onOpenChange={open => { if (!open) closeEventDialog(); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div className="text-base font-semibold mb-1">{selectedEvent?.subtitle}</div>
          <div className="text-base text-muted-foreground mb-2">{selectedEvent?.description}</div>
          <div className="text-sm text-muted-foreground mb-4">{selectedEvent ? new Date(selectedEvent.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</div>
          <DialogFooter>
            <Button variant="default">Start Now</Button>
            <Button variant="secondary">Set Budget</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function renderEventContent(eventInfo: any) {
  const { title, extendedProps } = eventInfo.event;
  return (
    <div className="bg-white border border-border rounded-lg px-2 py-1 mb-1 shadow-sm">
      <div className="text-xs font-semibold text-primary truncate">{title}</div>
      {extendedProps?.subtitle && (
        <div className="text-[10px] font-medium text-primary/80 truncate">{extendedProps.subtitle}</div>
      )}
      {extendedProps?.description && (
        <div className="text-[10px] text-muted-foreground truncate">{extendedProps.description}</div>
      )}
    </div>
  );
}

export default BrandDashboard; 