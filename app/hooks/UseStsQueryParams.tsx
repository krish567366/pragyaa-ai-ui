import { defaultVoice } from "app/lib/constants";
import type { StsConfig } from "app/utils/deepgramUtils";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useStsQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [params, setParams] = useState<{
    voice: string;
    instructions: string | null;
    provider: string | null;
    model: string | null;
    temp: string | null;
    rep_penalty: string | null;
  }>({
    voice: searchParams.get("voice") || defaultVoice.canonical_name,
    instructions: searchParams.get("instructions"),
    provider: searchParams.get("provider"),
    model: searchParams.get("model"),
    temp: searchParams.get("temp"),
    rep_penalty: searchParams.get("rep_penalty"),
  });

  useEffect(() => {
    setParams({
      voice: searchParams.get("voice") || defaultVoice.canonical_name,
      instructions: searchParams.get("instructions"),
      provider: searchParams.get("provider"),
      model: searchParams.get("model"),
      temp: searchParams.get("temp"),
      rep_penalty: searchParams.get("rep_penalty"),
    });
  }, [searchParams]);

  const applyParamsToConfig = useCallback(
    (config: StsConfig): StsConfig => {
      const { voice, instructions: queryInstructions, provider: queryProvider, model: queryModel, temp, rep_penalty } = params;

      const basePrompt = config.agent?.think?.prompt || "";

      let finalPrompt = basePrompt;
      if (queryInstructions) {
        if (basePrompt) {
          finalPrompt = `${basePrompt}\n${queryInstructions}`;
        } else {
          finalPrompt = queryInstructions;
        }
      }

      // Start with a copy of the original think config or an empty object
      const newThinkConfig = { 
        ...(config.agent?.think || { provider: { type: "", model: "" }, prompt: "" }) 
      };
      newThinkConfig.prompt = finalPrompt; // Always set the potentially updated prompt

      // Update provider type and model if query params exist
      if (queryProvider) {
        newThinkConfig.provider = {
          ...(newThinkConfig.provider || { type: "", model: "" }),
          type: queryProvider,
        };
      }
      if (queryModel) {
        newThinkConfig.provider = {
          ...(newThinkConfig.provider || { type: "", model: "" }), // Ensure model field exists if provider was minimal
          model: queryModel,
        };
      }
      // Ensure provider has both type and model if one was set and other was missing from original or defaults
      if (newThinkConfig.provider && (queryProvider || queryModel)) {
        if (!newThinkConfig.provider.type) newThinkConfig.provider.type = config.agent?.think?.provider?.type || "";
        if (!newThinkConfig.provider.model) newThinkConfig.provider.model = config.agent?.think?.provider?.model || "";
      }

      return {
        ...config,
        agent: {
          ...config.agent,
          think: newThinkConfig as StsConfig['agent']['think'], // Assert type to satisfy linter for now
          speak: {
            ...(config.agent?.speak || { provider: { type: "", model: ""} }),
            provider: {
              ...(config.agent?.speak?.provider || { type: "", model: "" }),
              ...(voice && { model: voice }),
            },
            ...(temp && { temp: parseFloat(temp) }),
            ...(rep_penalty && { rep_penalty: parseFloat(rep_penalty) }),
          },
        },
      };
    },
    [params],
  );

  const updateUrlParam = useCallback(
    (param: string, value: string | null) => {
      const url = new URL(window.location.href);
      if (value) {
        url.searchParams.set(param, value);
      } else {
        url.searchParams.delete(param);
      }
      router.replace(url.toString());
    },
    [router],
  );

  const memoizedUpdateInstructionsUrlParam = useCallback(
    (text: string | null) => updateUrlParam("instructions", text),
    [updateUrlParam],
  );

  const memoizedUpdateVoiceUrlParam = useCallback(
    (voice: string) => updateUrlParam("voice", voice),
    [updateUrlParam],
  );

  return {
    ...params,
    applyParamsToConfig,
    updateInstructionsUrlParam: memoizedUpdateInstructionsUrlParam,
    updateVoiceUrlParam: memoizedUpdateVoiceUrlParam,
  };
};
