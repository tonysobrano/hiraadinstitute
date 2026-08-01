import {defineField, defineType} from 'sanity'

export const newsletterSubscriberType = defineType({
  name: 'newsletterSubscriber',
  title: 'Newsletter Subscriber',
  type: 'document',
  groups: [
    {name: 'subscriber', title: 'Subscriber', default: true},
    {name: 'delivery', title: 'Delivery'},
  ],
  fields: [
    defineField({
      name: 'email',
      title: 'Email address',
      type: 'string',
      group: 'subscriber',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'subscriber',
      initialValue: 'subscribed',
      options: {
        list: [
          {title: 'Subscribed', value: 'subscribed'},
          {title: 'Unsubscribed', value: 'unsubscribed'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subscribedAt',
      title: 'First subscribed at',
      type: 'datetime',
      group: 'subscriber',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastSubscribedAt',
      title: 'Last subscribed at',
      type: 'datetime',
      group: 'subscriber',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Signup source',
      type: 'string',
      group: 'subscriber',
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
      name: 'lastSubscribedAtDesc',
      by: [{field: 'lastSubscribedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'email',
      status: 'status',
      subscribedAt: 'lastSubscribedAt',
    },
    prepare({title, status, subscribedAt}) {
      const date = subscribedAt ? new Date(subscribedAt).toLocaleDateString() : 'Unknown date'
      return {
        title: title || 'Unknown subscriber',
        subtitle: `${status || 'subscribed'} · ${date}`,
      }
    },
  },
})
