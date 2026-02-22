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
      <AlertDialogContent className="rounded-3xl p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-1 w-full text-start text-xl">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sub-font-black mb-1 w-full text-start">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full flex-row">
          <AlertDialogCancel
            onClick={onCancel ?? onOpenChange}
            variant="cancel"
            className="h-13 flex-1 rounded-xl"
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="h-13 flex-1 rounded-xl"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmModal;
