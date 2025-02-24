import { useCallback, useEffect, useState } from "react";

const useTranslate = (language = "en") => {
	const [common, setCommon] = useState<Record<string, unknown> | null>(null);

	useEffect(() => {
		const loadCommon = async () => {
			const commonData = await import(`@/locales/${language}/common.json`);

			setCommon(commonData);
		};

		loadCommon();
	}, [language]);

	const t = useCallback(
		(key: string) => {
			if (!common) return key;

			const paths = key.split(".");
			let result: unknown = common;

			for (const path of paths) {
				if (typeof result === "object" && result !== null && path in result) {
					result = (result as Record<string, unknown>)[path];
				} else {
					return key;
				}
			}

			return typeof result === "string" ? result : key;
		},
		[common],
	);

	return { t };
};

export default useTranslate;
