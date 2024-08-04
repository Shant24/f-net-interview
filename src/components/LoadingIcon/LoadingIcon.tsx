import { spinners } from "./constants";

interface LoadingIconProps extends React.ComponentPropsWithoutRef<"span"> {
  icon?:
    | "audio"
    | "ball-triangle"
    | "bars"
    | "circles"
    | "grid"
    | "hearts"
    | "oval"
    | "puff"
    | "rings"
    | "spinning-circles"
    | "tail-spin"
    | "three-dots";
  color?: React.CSSProperties["color"];
}

const LoadingIcon = (props: LoadingIconProps) => {
  const { icon = "oval", color = "var(---color-white)", ...computedProps } = props;

  return (
    <span {...computedProps} style={{ ...computedProps.style, color }}>
      {icon && spinners[icon]}
    </span>
  );
};

export default LoadingIcon;
