"use client";

import { AppScaffold } from "@/components/layout/AppScaffold";
import { IdeaGalaxy } from "@/components/galaxy/IdeaGalaxy";
import { useIdeas } from "@/hooks/useIdeas";

export default function GalaxyPage() {
  const { ideas } = useIdeas();

  return (
    <AppScaffold>
      <IdeaGalaxy ideas={ideas} />
    </AppScaffold>
  );
}
