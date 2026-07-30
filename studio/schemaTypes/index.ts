import {eventType} from './documents/event'
import {newsType} from './documents/news'
import {publicationType} from './documents/publication'
import {researchSubmissionType} from './documents/researchSubmission'
import {eventImageSetType} from './objects/eventImageSet'
import {imageOverrideType} from './objects/imageOverride'
import {seoFieldsType} from './objects/seoFields'
import {textOverrideType} from './objects/textOverride'
import {pageContentType} from './pageContent'

export const schemaTypes = [
  pageContentType,
  eventType,
  publicationType,
  researchSubmissionType,
  newsType,
  textOverrideType,
  imageOverrideType,
  eventImageSetType,
  seoFieldsType,
]
