import { SoundsPage } from "@/components/sounds-page";
import { getAllSounds } from "@/lib/sound-data";

export default function Home() {
  const sounds = getAllSounds();
  return <SoundsPage sounds={sounds} />;
}
