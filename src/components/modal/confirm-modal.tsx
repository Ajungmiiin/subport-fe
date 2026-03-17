import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertDialogHeader } from '../ui/alert-dialog';

type ConfirmModalProps = {
  open: boolean;
  onOpenChange: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  onCancel?: () => void;
};

function ConfirmModal({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  title,
  description,
  confirmText,
  cancelText,
}: ConfirmModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-background-black rounded-2xl border-none pt-8 pb-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-1 w-full text-center text-lg font-medium text-white">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sub-font-black mb-3 w-full text-center">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex w-full gap-3">
          <AlertDialogCancel
            onClick={onCancel ?? onOpenChange}
            variant="cancel"
            className="h-12 flex-1 rounded-xl"
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-primary-light-active hover:bg-primary-light-hover h-12 flex-1 rounded-xl"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmModal;
