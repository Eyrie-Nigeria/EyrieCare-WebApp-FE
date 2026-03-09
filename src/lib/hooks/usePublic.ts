import { useMutation } from "@tanstack/react-query";
import { publicService, WaitlistPayload } from "@/services/public.service";

export const useJoinWaitlist = () => {
  return useMutation({
    mutationFn: (data: WaitlistPayload) => publicService.joinWaitlist(data),
  });
};
