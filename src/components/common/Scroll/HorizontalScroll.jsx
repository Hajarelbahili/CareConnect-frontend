import "./HorizontalScroll.css";

function HorizontalScroll({ children, className = "" }) {
  return <div className={`horizontal-scroll ${className}`}>{children}</div>;
}

export default HorizontalScroll;
