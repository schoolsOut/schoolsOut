import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CalendarDisplayComponent extends Component {
  calendarSources = Object.freeze([
    {
      name: 'Adults',
      key: 'YnExbWI3b28yYmdoYzA1dHY0YXV0NzJqY2dAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
      color: '#AD1457'
    },
    {
      name: 'Art',
      key: 'b3M2NXU5cDRwN2ZiOTNoN28xcnUyZmsyaW9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
      color: '#F4511E'
    },
    {
      name: 'Diverse Learners',
      key: 'cHFwaW5lcDJzdDM3ajEyOXFuOGkzYWNqZ2dAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
      color: '#0B8043'
    },
    {
      name: 'Engineering/Technology',
      key: 'YjNodjIzY3JvbGJvZXI5ZmpqNzcxMDg2MzBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
      color: '#8E24AA'
    },
    {
      name: 'ESL',
      key: 'YzU2ZnNncXVocjI1M2ZnaGxkN3A2OXJwZWNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
      color: '#3F51B5'
    },
    {
      name: 'Family/Consumer Sciences',
      key: 'cmVkNW1vMGV2Z3BpcXJ1M2kzY2E4MjZldmdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
      color: '#D81B60'
    },
    {
      name: 'Fitness/Dance',
      key: 'bGNpazZxMWkyb3U5ZzVxZ2wxYXNpcHFkYTRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
      color: '#EF6C00'
    },
    {
      name: 'General',
      key: 'MW45dWswOWw2Y2Z1ZmlyM3VtMThicm5vOW9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
      color: '#C0CA33'
    },
    {
      name: 'History/Civics',
      key: 'N3BkYTdjaTEwN25oZWVmcGVmOXVxaGZrMW9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
      color: '#009688'
    },
    {
      name: 'Languages',
      key: 'ZTFicGZzaWs5ZW91ZjduOTdocGFsaHVpNjBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
      color: '#7986CB'
    },
    {
      name: 'Literacy',
      key: 'cjMwbWQ4Z2w3bHB1N3E0OWllZWRyNTI1a2NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
      color: '#D50000'
    },
    {
      name: 'Math',
      key: 'ZmpnY3NqODg5cGZlNXVsNmcwaGJqcmJlb2tAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
      color: '#F09300'
    },
    {
      name: 'Media/Journalism',
      key: 'bmplM2UwaGl0OW9tOTlqczVtZG1qYjBxbGtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
      color: '#7CB342'
    },
    {
      name: 'Music/Theater',
      key: 'a3JwdXAwOTNiN3JrY2JkYnRxZHNlZjE1dmdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
      color: '#039BE5'
    },
    {
      name: 'Religion',
      key: 'bTJwNnYyMTU1bGNjcm1taGJ2Yzhsa2swZ2dAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
      color: '#B39DDB'
    },
    {
      name: 'Science/Nature',
      key: 'bm1mNWVybHR2OTNmOHR0bXVtYnZpamw5NnNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
      color: '#616161'
    },
    {
      name: 'Social/Emotional',
      key: 'bnQxNjF0aW0yNTMwOWIyZnR0czltbDkwajRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
      color: '#E4C441'
    }
  ])

  @tracked selectedCalendars = [];

  get calendars() {
    return this.calendarSources.map((cal) => {
      return {
        name: cal.name,
        key: cal.key,
        color: cal.color,
        selected: this.selectedCalendars.includes(cal.key)
      }
    })
  }

  @action
  toggleSelection(key) {
    if (this.selectedCalendars.includes(key)) {
      this.selectedCalendars.removeObject(key);
    } else {
      this.selectedCalendars.pushObject(key);
    }
  }

  get iframeSource() {
    let params = [
      [ 'height', '600' ],
      [ 'wkst', '1' ],
      [ 'bgcolor', '%23ffffff' ],
      [ 'ctz', 'America%2FNew_York' ],
      [ 'showTitle', '0' ],
      [ 'mode', 'WEEK' ],
    ]

    const sources = [];
    const colors = [];

    this.calendars.forEach(function(cal) {
      if (cal.selected) {
        sources.pushObject(['src', cal.key]);
        colors.pushObject(['color', `%23${cal.color.substring(1,7)}`]);
      }
    });

    params.pushObjects(sources);
    params.pushObjects(colors);

    params = params.map(function(p) {return p.join('=')});

    return `https://calendar.google.com/calendar/b/1/embed?${params.join('&')}`
  }
}
