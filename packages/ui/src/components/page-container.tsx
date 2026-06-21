import * as React from "react";

function PageSkeleton() {
  return (
    <div className="flex flex-1 animate-pulse flex-col gap-4 p-4 md:px-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="bg-muted mb-2 h-8 w-48 rounded" />
          <div className="bg-muted h-4 w-96 rounded" />
        </div>
      </div>
      <div className="bg-muted mt-6 h-40 w-full rounded-lg" />
      <div className="bg-muted h-40 w-full rounded-lg" />
    </div>
  );
}

export interface PageContainerProps {
  children: React.ReactNode;
  isLoading?: boolean;
  access?: boolean;
  accessFallback?: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
  pageHeaderAction?: React.ReactNode;
}

/**
 * Standard page body wrapper shared by all dashboard apps.
 *
 * Renders an optional title/description header and a content area, with
 * built-in loading skeleton and access-gate fallback. Intentionally decoupled
 * from the Infobar system so it is safe to use in apps that do not mount an
 * InfobarProvider — pass `pageHeaderAction` to add app-specific controls.
 */
export function PageContainer({
  children,
  isLoading = false,
  access = true,
  accessFallback,
  pageTitle,
  pageDescription,
  pageHeaderAction,
}: PageContainerProps) {
  if (!access) {
    return (
      <div className="flex flex-1 items-center justify-center p-4 md:px-6">
        {accessFallback ?? (
          <div className="text-muted-foreground text-center text-lg">
            You do not have access to this page.
          </div>
        )}
      </div>
    );
  }

  const content = isLoading ? <PageSkeleton /> : children;
  const hasHeader = pageTitle || pageHeaderAction;

  return (
    <div className="flex flex-1 flex-col px-4 pt-2 pb-4 md:px-6 md:pt-4">
      {hasHeader && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {pageTitle && (
              <h2 className="text-3xl font-bold tracking-tight">{pageTitle}</h2>
            )}
            {pageDescription && (
              <p className="text-muted-foreground text-sm">{pageDescription}</p>
            )}
          </div>
          {pageHeaderAction && <div className="shrink-0">{pageHeaderAction}</div>}
        </div>
      )}
      {content}
    </div>
  );
}
