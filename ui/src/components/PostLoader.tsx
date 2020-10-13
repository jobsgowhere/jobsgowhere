import * as React from "react";
import styled from "styled-components";

const Loader = styled.div`
  text-align: center;
  padding: 1rem 0;
  color: var(--color-grey-300);
`;

type Props = {
  hasMore: boolean;
  onLoadMore: () => Promise<void>;
};

const PostLoader: React.FC<Props> = ({ hasMore, onLoadMore }) => {
  const prevY = React.useRef<number>(0);
  const [element, setElement] = React.useState<HTMLDivElement | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const observer = React.useRef(
    new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const { y } = entries[0].boundingClientRect;
        if (prevY.current > y) {
          setLoading(true);
          setTimeout(() => {
            onLoadMore().finally(() => setLoading(false));
          }, 500);
        }
        prevY.current = y;
      },
      { threshold: 0.75 },
    ),
  );

  React.useEffect(() => {
    const observerRef = observer.current;
    if (element && hasMore) {
      loading ? observerRef.unobserve(element) : observerRef.observe(element);
    }
    return () => {
      if (element) {
        observerRef.unobserve(element);
      }
    };
  }, [hasMore, loading, element]);

  return (
    <Loader ref={setElement}>
      {hasMore ? (loading ? "Loading more posts..." : null) : "No more posts"}
    </Loader>
  );
};

export default PostLoader;
