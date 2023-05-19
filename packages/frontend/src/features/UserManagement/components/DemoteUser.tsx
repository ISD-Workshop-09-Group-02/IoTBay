import { Button, ButtonProps, useToast } from "@chakra-ui/react";
import { trpcReact } from "../../../App";
import { isTRPCClientError } from "../../../utils/trpc";

interface DemoteUserButton extends ButtonProps {
  userId: string;
}

export default function DemoteUserButton({
  userId,
  ...buttonProps
}: DemoteUserButton) {
  const context = trpcReact.useContext();
  const toast = useToast();
  const deactivateStaffMutation = trpcReact.staff.deactivate.useMutation({
    onSuccess: () => {
      context.users.users.invalidate();
    },
    onError: (error) => {
      if (isTRPCClientError(error)) {
        toast({
          title: "User promotion failed",
          description: error.message,
          status: "error",
          duration: 5000,
        });
      } else {
        toast({
          title: "User promotion failed",
          description: "Unknown error",
          status: "error",
          duration: 5000,
        });
      }
    },
  });

  return (
    <Button
      {...buttonProps}
      onClick={() => {
        deactivateStaffMutation.mutate(userId);
      }}
      loading={deactivateStaffMutation.isLoading}
    />
  );
}
