import { Suspense } from 'react';
import PageTitle from '@/components/generics/title/PageTitle';
import QuestBlock from '@/components/content/QuestBlock';
import GenreNavigation from '@/components/content/GenreNavigation';
import { getAllQuests } from '@/actions/quests';
import { getUser } from '@/actions/user';

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ genre?: string }>;
}) {
  const [user, params] = await Promise.all([getUser(), searchParams]);

  let questsLoadFailed = false;
  let questsData: Awaited<ReturnType<typeof getAllQuests>> = [];

  try {
    questsData = await getAllQuests();
  } catch {
    questsLoadFailed = true;
  }

  const selectedGenre = params?.genre;

  const filteredQuests = questsLoadFailed
    ? []
    : selectedGenre
      ? questsData.filter(quest =>
          quest.genres?.some(questGenre => questGenre.genreName === selectedGenre),
        )
      : questsData;

  return (
    <div className="relative">
      <div className="pb-12 pt-[122px] pl-[136px]">
        <PageTitle overline="Quests in Calgary" title="Find Your Quest" />
      </div>
      <Suspense fallback={null}>
        <GenreNavigation />
      </Suspense>
      {questsLoadFailed ? (
        <div className="pl-[136px] pr-[150px] pb-20 max-w-2xl">
          <div
            role="alert"
            className="rounded-lg border border-white/15 bg-[#2a2a2a] px-6 py-8 text-[#E5E5E5]"
          >
            <p className="text-lg font-semibold text-[#F28A0F]">Quests temporarily unavailable</p>
            <p className="mt-2 text-sm opacity-90">
              We couldn&apos;t load quests from the server. Please try again in a moment.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-x-6 gap-y-8 pl-[136px] pr-[150px] pb-20">
          {filteredQuests.map(quest =>
            quest ? <QuestBlock key={quest.id.toString()} quest={quest} user={user} /> : null,
          )}
        </div>
      )}
    </div>
  );
}
