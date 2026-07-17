function Container({ children, className = "" }) {
  return (
    <div
      className={`w-full px-6 sm:px-8 lg:px-10 xl:px-12 ${className}`}
    >
      <div className="mx-auto max-w-[1400px]">
        {children}
      </div>
    </div>
  );
}

export default Container;