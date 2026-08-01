import {defineField, defineType} from 'sanity'

export const contactSubmissionType = defineType({
  name: 'contactSubmission',
  title: 'Contact Submission',
  type: 'document',
  groups: [
    {name: 'inquiry', title: 'Inquiry', default: true},
    {name: 'delivery', title: 'Delivery'},
  ],
  fields: [
    defineField({
      name: 'reference',
      title: 'Reference',
      type: 'string',
      group: 'inquiry',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'inquiry',
      initialValue: 'new',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'In progress', value: 'inProgress'},
          {title: 'Replied', value: 'replied'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted at',
      type: 'datetime',
      group: 'inquiry',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fullName',
      title: 'Full name',
      type: 'string',
      group: 'inquiry',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email address',
      type: 'string',
      group: 'inquiry',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'string',
      group: 'inquiry',
    }),
    defineField({
      name: 'interest',
      title: 'Interest area',
      type: 'string',
      group: 'inquiry',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 10,
      group: 'inquiry',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      group: 'delivery',
      readOnly: true,
    }),
    defineField({
      name: 'notificationStatus',
      title: 'Email notification status',
      type: 'string',
      group: 'delivery',
      readOnly: true,
    }),
    defineField({
      name: 'notificationId',
      title: 'Resend notification ID',
      type: 'string',
      group: 'delivery',
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      name: 'fullName',
      interest: 'interest',
      status: 'status',
      reference: 'reference',
    },
    prepare({name, interest, status, reference}) {
      return {
        title: name || 'Unknown sender',
        subtitle: `${reference || 'No reference'} · ${interest || 'No interest'} · ${status || 'new'}`,
      }
    },
  },
})
