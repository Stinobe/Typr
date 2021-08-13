import React from "react";

type LoadingProps = {
  text?: string;
};

const Loading: React.FC<LoadingProps> = ({ text }: LoadingProps): React.ReactElement => (
  <div>
    <p>{text}</p>
  </div>
);

Loading.defaultProps = {
  text: "Loading ...",
};

export default Loading;
