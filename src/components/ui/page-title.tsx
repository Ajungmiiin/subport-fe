function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mr-auto mb-5 text-xl/relaxed font-semibold break-keep">
      {children}
    </p>
  );
}

export default PageTitle;
