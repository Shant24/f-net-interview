const SuccessMessageIcon = (props: JSX.IntrinsicElements["svg"]) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="none" viewBox="0 0 72 72" {...props}>
    <circle cx="36" cy="36" r="35" stroke="currentColor" strokeWidth="2" />
    <path
      fill="currentColor"
      d="M51.153 26.905L30.546 47.512l-9.697-9.697 2.417-2.417 7.28 7.263 18.19-18.173 2.417 2.417z"
    />
  </svg>
);

export default SuccessMessageIcon;
