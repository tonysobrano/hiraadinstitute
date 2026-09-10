import { CloudSun, Handshake, Scale, ScrollText, Shield, Wheat } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ContentResolver } from "@/lib/site/types";

export interface ResearchArea {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  summary: string;
}

export function getResearchAreas(c: ContentResolver): ResearchArea[] {
  return [
    {
      id: "peace-conflict-nexus",
      icon: Handshake,
      title: c.t("research.thematic.1.title", "Peace-Conflict Nexus"),
      description: c.t(
        "research.thematic.1.description",
        "The Institute examines the drivers of conflict, violence, and insecurity in the Somali Region while developing practical approaches to peacebuilding, conflict prevention, reconciliation, and social cohesion. Particular attention is given to youth engagement in peace processes and community-based conflict resolution."
      ),
      summary: c.t(
        "research.thematic.1.summary",
        "Drivers of conflict and insecurity in the Somali Region, alongside practical approaches to peacebuilding, prevention, and reconciliation."
      )
    },
    {
      id: "policy-governance",
      icon: Shield,
      title: c.t("research.thematic.2.title", "Policy and Governance"),
      description: c.t(
        "research.thematic.2.description",
        "Hiraad conducts research on public policy, governance systems, institutional accountability, transparency, stakeholder engagement, rule of law, and human rights to strengthen effective and responsive public institutions."
      ),
      summary: c.t(
        "research.thematic.2.summary",
        "Public policy, governance systems, institutional accountability, rule of law, and human rights for responsive public institutions."
      )
    },
    {
      id: "pastoralism-agriculture-development",
      icon: Wheat,
      title: c.t("research.thematic.3.title", "Pastoralism, Agriculture, and Development"),
      description: c.t(
        "research.thematic.3.description",
        "Recognizing pastoralism as the backbone of the regional economy, the Institute studies challenges related to drought, natural resource management, livestock production, market access, and agricultural transformation. Research aims to improve livelihoods, resilience, and food security."
      ),
      summary: c.t(
        "research.thematic.3.summary",
        "Drought, natural resource management, livestock production, and market access — research to improve livelihoods, resilience, and food security."
      )
    },
    {
      id: "climate-environment",
      icon: CloudSun,
      title: c.t("research.thematic.4.title", "Climate Change and the Environment"),
      description: c.t(
        "research.thematic.4.description",
        "Hiraad researches the impacts of climate change — including drought, flooding, and environmental degradation — and promotes adaptation strategies that strengthen resilience and support sustainable development."
      ),
      summary: c.t(
        "research.thematic.4.summary",
        "Impacts of drought, flooding, and environmental degradation, and adaptation strategies that strengthen resilience."
      )
    },
    {
      id: "transitional-justice-social-cohesion",
      icon: Scale,
      title: c.t("research.thematic.5.title", "Transitional Justice and Social Cohesion"),
      description: c.t(
        "research.thematic.5.description",
        "Transitional justice, trauma healing, and social cohesion are fundamental for societies emerging from violent conflict, political exclusion, and long-standing neglect, as in the Somali Region. Hiraad conducts policy research and public engagement in these areas to address past grievances and support sustainable peace and development."
      ),
      summary: c.t(
        "research.thematic.5.summary",
        "Policy research and public engagement on transitional justice, trauma healing, and social cohesion after conflict and exclusion."
      )
    },
    {
      id: "history-collective-memory",
      icon: ScrollText,
      title: c.t("research.thematic.6.title", "History and Collective Memory"),
      description: c.t(
        "research.thematic.6.description",
        "Hiraad recognizes history and collective memory as foundational pillars of society. The Institute researches the region's historical legacy, cultural identity, and collective memory while promoting their integration into sustainable development and social cohesion initiatives."
      ),
      summary: c.t(
        "research.thematic.6.summary",
        "The region's historical legacy, cultural identity, and collective memory, and their place in development and social cohesion."
      )
    }
  ];
}
