let ssr = false;

export const isSsr = () => ssr;

export const setSsr = (needSsr: boolean) => {
  ssr = needSsr;
};

export function execInSsrContext(fn: () => void) {
  if (isSsr()) {
    fn();
  }
}
