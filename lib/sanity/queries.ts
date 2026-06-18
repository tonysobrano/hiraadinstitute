import { groq } from "next-sanity";

export const PAGE_CONTENT_QUERY = groq`
  *[_type == "pageContent" && slug == $slug][0] {
    slug,
    textOverrides[]{
      nodeName,
      nodeId,
      value
    },
    imageOverrides[]{
      nodeName,
      nodeId,
      url
    },
    eventImageSets[]{
      eventSlug,
      "previewImageUrl": previewImage.asset->url,
      "galleryImageUrls": galleryImages[].asset->url
    }
  }
`;

export const EVENTS_QUERY = groq`
  *[_type == "event"] | order(coalesce(date, eventDate, _createdAt) desc) {
    "slug": slug.current,
    title,
    "date": coalesce(date, string(eventDate), ""),
    "meta": coalesce(meta, location, category, author, string(date), ""),
    category,
    author,
    location,
    "previewDescription": coalesce(previewDescription, excerpt, body[0].children[0].text, ""),
    "introTitle": coalesce(introTitle, "Overview"),
    "introText": coalesce(introText, body[0].children[0].text, excerpt, ""),
    "detailsTitle": coalesce(detailsTitle, "Event details"),
    "highlightsTitle": coalesce(highlightsTitle, "Highlights"),
    "highlightsText": coalesce(highlight, highlightsText, ""),
    "nextStepsTitle": coalesce(nextStepsTitle, "Next steps"),
    "nextStepsText": coalesce(nextStepsText, body[1].children[0].text, body[0].children[0].text, excerpt, ""),
    "assetTitle": coalesce(assetTitle, "Related resources"),
    "assetText": coalesce(assetText, excerpt, body[0].children[0].text, ""),
    "assetPrimaryLabel": coalesce(assetPrimaryLabel, "View details"),
    "assetPrimaryHref": coalesce(assetPrimaryHref, "/contact"),
    "assetSecondaryLabel": coalesce(assetSecondaryLabel, "Get in touch"),
    "assetSecondaryHref": coalesce(assetSecondaryHref, "/contact"),
    "previewImage": coalesce(previewImage.asset->url, mainImage.asset->url),
    "galleryImages": galleryImages[].asset->url,
    "relatedEventSlugs": coalesce(relatedEvents[]->slug.current, [])
  }
`;

export const EVENT_BY_SLUG_QUERY = groq`
  *[_type == "event" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    "date": coalesce(date, string(eventDate), ""),
    "meta": coalesce(meta, location, category, author, string(date), ""),
    category,
    author,
    location,
    "previewDescription": coalesce(previewDescription, excerpt, body[0].children[0].text, ""),
    "introTitle": coalesce(introTitle, "Overview"),
    "introText": coalesce(introText, body[0].children[0].text, excerpt, ""),
    "detailsTitle": coalesce(detailsTitle, "Event details"),
    "highlightsTitle": coalesce(highlightsTitle, "Highlights"),
    "highlightsText": coalesce(highlight, highlightsText, ""),
    "nextStepsTitle": coalesce(nextStepsTitle, "Next steps"),
    "nextStepsText": coalesce(nextStepsText, body[1].children[0].text, body[0].children[0].text, excerpt, ""),
    "assetTitle": coalesce(assetTitle, "Related resources"),
    "assetText": coalesce(assetText, excerpt, body[0].children[0].text, ""),
    "assetPrimaryLabel": coalesce(assetPrimaryLabel, "View details"),
    "assetPrimaryHref": coalesce(assetPrimaryHref, "/contact"),
    "assetSecondaryLabel": coalesce(assetSecondaryLabel, "Get in touch"),
    "assetSecondaryHref": coalesce(assetSecondaryHref, "/contact"),
    "previewImage": coalesce(previewImage.asset->url, mainImage.asset->url),
    "galleryImages": galleryImages[].asset->url,
    "relatedEventSlugs": coalesce(relatedEvents[]->slug.current, [])
  }
`;

export const EVENT_SLUGS_QUERY = groq`
  *[_type == "event" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const PUBLICATIONS_QUERY = groq`
  *[_type == "publication"] | order(coalesce(publishedAt, date, _createdAt) desc) {
    "slug": slug.current,
    "kind": coalesce(kind, "other"),
    "meta": coalesce(meta, string(publishedAt), ""),
    title,
    "description": coalesce(description, excerpt, body[0].children[0].text, ""),
    "tags": coalesce(tags, authors[0], ""),
    "button": coalesce(button, select(defined(pdfFile.asset) => "Download PDF", "Open"))
  }
`;

export const PUBLICATION_BY_SLUG_QUERY = groq`
  *[_type == "publication" && slug.current == $slug][0] {
    "slug": slug.current,
    "kind": coalesce(kind, "other"),
    "meta": coalesce(meta, string(publishedAt), ""),
    title,
    "description": coalesce(description, excerpt, body[0].children[0].text, ""),
    "tags": coalesce(tags, authors[0], ""),
    "button": coalesce(button, select(defined(pdfFile.asset) => "Download PDF", "Open")),
    "breadcrumb": coalesce(breadcrumb, "Publications / Research"),
    "metaLine": coalesce(metaLine, meta, string(publishedAt), ""),
    "introTitle": coalesce(introTitle, "Overview"),
    "introText": coalesce(introText, body[0].children[0].text, excerpt, ""),
    "detailsTitle": coalesce(detailsTitle, "Publication details"),
    "detailCards": coalesce(detailCards[]{
      label,
      value
    }, [
      {
        "label": "Published",
        "value": string(publishedAt)
      },
      {
        "label": "Author",
        "value": coalesce(authors[0], "Hiraad Institute")
      }
    ]),
    "blockOneTitle": coalesce(blockOneTitle, "Summary"),
    "blockOneText": coalesce(blockOneText, body[0].children[0].text, excerpt, ""),
    "blockTwoTitle": coalesce(blockTwoTitle, "Details"),
    "blockTwoText": coalesce(blockTwoText, body[1].children[0].text, body[0].children[0].text, excerpt, ""),
    "assetTitle": coalesce(assetTitle, "Publication assets"),
    "assetText": coalesce(assetText, excerpt, "Download the full publication for reference."),
    "assetPrimaryLabel": coalesce(assetPrimaryLabel, select(defined(pdfFile.asset) => "Download PDF", "Open publication")),
    "assetPrimaryHref": coalesce(assetPrimaryHref, pdfFile.asset->url, "/contact"),
    "assetSecondaryLabel": coalesce(assetSecondaryLabel, "Contact"),
    "assetSecondaryHref": coalesce(assetSecondaryHref, "/contact"),
    "relatedPublications": coalesce(relatedPublications[]->{
      "slug": slug.current,
      "meta": coalesce(meta, string(publishedAt), ""),
      title
    }, [])
  }
`;

export const PUBLICATION_SLUGS_QUERY = groq`
  *[_type == "publication" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const NEWS_QUERY = groq`
  *[_type == "news"] | order(coalesce(publishedAt, date, _createdAt) desc) {
    "slug": slug.current,
    "meta": coalesce(meta, string(publishedAt), ""),
    title,
    "image": mainImage.asset->url,
    "description": coalesce(description, excerpt, body[0].children[0].text, "")
  }
`;

export const NEWS_BY_SLUG_QUERY = groq`
  *[_type == "news" && slug.current == $slug][0] {
    "slug": slug.current,
    "meta": coalesce(meta, string(publishedAt), ""),
    title,
    "image": mainImage.asset->url,
    "description": coalesce(description, excerpt, body[0].children[0].text, ""),
    "breadcrumb": coalesce(breadcrumb, "News / Story"),
    "metaLine": coalesce(metaLine, meta, string(publishedAt), ""),
    "introTitle": coalesce(introTitle, "Overview"),
    "introText": coalesce(introText, body[0].children[0].text, excerpt, ""),
    "detailsTitle": coalesce(detailsTitle, "Story details"),
    "author": coalesce(author, "Hiraad Institute"),
    "location": coalesce(location, "Somali Region"),
    "source": coalesce(source, "Hiraad Institute"),
    "blockOneTitle": coalesce(blockOneTitle, "Summary"),
    "blockOneText": coalesce(blockOneText, body[0].children[0].text, excerpt, ""),
    "blockTwoTitle": coalesce(blockTwoTitle, "Details"),
    "blockTwoText": coalesce(blockTwoText, body[1].children[0].text, body[0].children[0].text, excerpt, ""),
    "assetTitle": coalesce(assetTitle, "Related resources"),
    "assetText": coalesce(assetText, excerpt, "For additional information, contact our team."),
    "assetPrimaryLabel": coalesce(assetPrimaryLabel, "Contact"),
    "assetPrimaryHref": coalesce(assetPrimaryHref, "/contact"),
    "assetSecondaryLabel": coalesce(assetSecondaryLabel, "Explore events"),
    "assetSecondaryHref": coalesce(assetSecondaryHref, "/events"),
    "relatedNews": coalesce(relatedNews[]->{
      "slug": slug.current,
      "meta": coalesce(meta, string(publishedAt), ""),
      title
    }, [])
  }
`;

export const NEWS_SLUGS_QUERY = groq`
  *[_type == "news" && defined(slug.current)]{
    "slug": slug.current
  }
`;
