import { Button, ButtonProps, useToast } from "@chakra-ui/react";
import { trpcReact } from "../../../App";
import { isTRPCClientError } from "../../../utils/trpc";

interface PromoteUserButton extends ButtonProps {
  userId: string;
}

export default function PromoteUserButton({
  userId,
  ...buttonProps
}: PromoteUserButton) {
  const context = trpcReact.useContext();
  const toast = useToast();
  const activateStaffMutation = trpcReact.staff.activate.useMutation({
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
        activateStaffMutation.mutate({
          userId: userId,
          position: "Generic Type",
        });
      }}
      loading={activateStaffMutation.isLoading}
    />
  );
}
