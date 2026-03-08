import { Drawer, DrawerContent, DrawerTitle } from '../ui/drawer';
import ExercisetEmoticon from '@/assets/emoticon/exercise.png';
import MusicEmoticon from '@/assets/emoticon/music.png';
import ArtEmoticon from '@/assets/emoticon/art.png';
import NewsEmoticon from '@/assets/emoticon/news.png';
import GameEmoticon from '@/assets/emoticon/game.png';
import MobileEmoticon from '@/assets/emoticon/mobile.png';
import BooksEmoticon from '@/assets/emoticon/books.png';
import TvEmoticon from '@/assets/emoticon/tv.png';
import CloudEmotiocn from '@/assets/emoticon/cloud.png';
import CardEmoticon from '@/assets/emoticon/card.png';
import BoxEmoticon from '@/assets/emoticon/box.png';
import WebEmoticon from '@/assets/emoticon/web.png';
import RobotEmoticon from '@/assets/emoticon/robot.png';
import { Plus } from 'lucide-react';
import { useRef } from 'react';

const CUSTOM_SUBSCRIBE_IMAGES = [
  {
    id: 'exercise',
    file: ExercisetEmoticon,
  },
  {
    id: 'music',
    file: MusicEmoticon,
  },
  {
    id: 'art',
    file: ArtEmoticon,
  },
  {
    id: 'news',
    file: NewsEmoticon,
  },
  {
    id: 'game',
    file: GameEmoticon,
  },
  {
    id: 'mobile',
    file: MobileEmoticon,
  },
  {
    id: 'books',
    file: BooksEmoticon,
  },
  { id: 'tv', label: 'TV', file: TvEmoticon },
  {
    id: 'cloud',
    file: CloudEmotiocn,
  },
  {
    id: 'card',
    file: CardEmoticon,
  },
  {
    id: 'box',
    file: BoxEmoticon,
  },
  {
    id: 'web',
    file: WebEmoticon,
  },
  {
    id: 'robot',
    file: RobotEmoticon,
  },
];

interface CustomSubscribeImageModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (file: { image: File; defaultImageName: string | null }) => void;
}

function CustomSubscribeImageSelectModal({
  open,
  onClose,
  onSelect,
}: CustomSubscribeImageModalProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const handleSelect = async (image: { id: string; file: string }) => {
    const response = await fetch(image.file);

    const blob = await response.blob();
    const extension = blob.type.split('/')[1] || 'png';
    const file = new File([blob], `${image.id}.${extension}`, {
      type: blob.type,
    });

    onSelect({ defaultImageName: image.id, image: file });
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerTitle className="mb-4 px-4 py-2 text-xl font-semibold text-white">
          사진 선택
        </DrawerTitle>

        <div className="grid grid-cols-4 gap-2">
          {CUSTOM_SUBSCRIBE_IMAGES.map((image) => (
            <button
              key={image.id}
              type="button"
              className="bg-box-black flex aspect-square cursor-pointer items-center justify-center rounded-lg"
              aria-label={`${image.id} emoticon`}
              onClick={() => handleSelect(image)}
            >
              <img
                src={image.file}
                alt={`${image.id} emoticon`}
                className="object-contain"
              />
            </button>
          ))}

          <button
            onClick={() => {
              if (!imageInputRef.current) return;
              imageInputRef.current.click();
            }}
            type="button"
            className="bg-box-black flex aspect-square cursor-pointer items-center justify-center rounded-lg"
          >
            <Plus strokeWidth={2} className="size-10" />
          </button>

          <input
            accept="image/png, image/jpeg"
            ref={imageInputRef}
            type="file"
            className="hidden"
            onChange={(e) => {
              const { files } = e.target;
              if (!files || files.length <= 0) return;
              const file = files[0];
              onSelect({ defaultImageName: null, image: file });
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default CustomSubscribeImageSelectModal;
