import { createTable as createTableAnnouncements } from './announcements.js'
import { createTable as createTableChurchMembers } from './churchMembers.js'
import { createTable as createTableSacramentMeeting } from './sacramentMeeting.js'
import { createTable as createTableSustainingAndReleasing } from './sustainingAndReleasing.js'
import { createTable as createTableTestimonies } from './testimonies.js'

await createTableAnnouncements();
await createTableChurchMembers();
await createTableSacramentMeeting();
await createTableSustainingAndReleasing();
await createTableTestimonies();