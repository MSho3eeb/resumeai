import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const Navbar = () => {
  return /* @__PURE__ */ jsxs("nav", { className: "navbar", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-gradient", children: "Resume AI" }) }),
    /* @__PURE__ */ jsx(Link, { to: "/upload", className: "primary-button w-fit", children: /* @__PURE__ */ jsx("p", { children: "Upload Resume" }) })
  ] });
};
const resumes = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: []
      },
      toneAndStyle: {
        score: 90,
        tips: []
      },
      content: {
        score: 90,
        tips: []
      },
      structure: {
        score: 90,
        tips: []
      },
      skills: {
        score: 90,
        tips: []
      }
    }
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: []
      },
      toneAndStyle: {
        score: 90,
        tips: []
      },
      content: {
        score: 90,
        tips: []
      },
      structure: {
        score: 90,
        tips: []
      },
      skills: {
        score: 90,
        tips: []
      }
    }
  },
  {
    id: "3",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: []
      },
      toneAndStyle: {
        score: 90,
        tips: []
      },
      content: {
        score: 90,
        tips: []
      },
      structure: {
        score: 90,
        tips: []
      },
      skills: {
        score: 90,
        tips: []
      }
    }
  },
  {
    id: "4",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: []
      },
      toneAndStyle: {
        score: 90,
        tips: []
      },
      content: {
        score: 90,
        tips: []
      },
      structure: {
        score: 90,
        tips: []
      },
      skills: {
        score: 90,
        tips: []
      }
    }
  },
  {
    id: "5",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: []
      },
      toneAndStyle: {
        score: 90,
        tips: []
      },
      content: {
        score: 90,
        tips: []
      },
      structure: {
        score: 90,
        tips: []
      },
      skills: {
        score: 90,
        tips: []
      }
    }
  },
  {
    id: "6",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: []
      },
      toneAndStyle: {
        score: 90,
        tips: []
      },
      content: {
        score: 90,
        tips: []
      },
      structure: {
        score: 90,
        tips: []
      },
      skills: {
        score: 90,
        tips: []
      }
    }
  }
];
const ScoreCircle = ({ score = 75 }) => {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = score / 100;
  const strokeDashoffset = circumference * (1 - progress);
  return /* @__PURE__ */ jsxs("div", { className: "relative w-[100px] h-[100px]", children: [
    /* @__PURE__ */ jsxs(
      "svg",
      {
        height: "100%",
        width: "100%",
        viewBox: "0 0 100 100",
        className: "transform -rotate-90",
        children: [
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx: "50",
              cy: "50",
              r: normalizedRadius,
              stroke: "#e5e7eb",
              strokeWidth: stroke,
              fill: "transparent"
            }
          ),
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "grad", x1: "1", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#FF97AD" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#5171FF" })
          ] }) }),
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx: "50",
              cy: "50",
              r: normalizedRadius,
              stroke: "url(#grad)",
              strokeWidth: stroke,
              fill: "transparent",
              strokeDasharray: circumference,
              strokeDashoffset,
              strokeLinecap: "round"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm", children: `${score}/100` }) })
  ] });
};
const ResumeCard = ({ resume }) => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Link, { to: `/resume/${resume.id}`, className: "resume-card animate-in fade-in duration-1000", children: [
    /* @__PURE__ */ jsxs("div", { className: "resume-card-header w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-black font-bold break-words", children: resume.companyName }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg break-words text-gray-500", children: resume.jobTitle })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(ScoreCircle, { score: resume.feedback.overallScore }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "gradient-border animate-in fade-in duration-1000", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full", children: /* @__PURE__ */ jsx("img", { src: resume.imagePath, alt: "resume", className: "w-full h-[200px] md:h-[350px] object-cover object-top" }) }) })
  ] }) });
};
function meta({}) {
  return [{
    title: "Resume AI"
  }, {
    name: "description",
    content: "Smart Feedback about your resume!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs("main", {
    className: "bg-[url('/images/bg-main.svg')] bg-cover",
    children: [/* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsxs("section", {
      className: "main-section",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "page-heading py-16",
        children: [/* @__PURE__ */ jsx("h1", {
          children: "Track Your Application & Resume Ratings"
        }), /* @__PURE__ */ jsx("h2", {
          children: "Review you submission and check AI-Powered feedback."
        })]
      }), resumes.length > 0 && /* @__PURE__ */ jsx("div", {
        className: "resumes-section",
        children: resumes.map((resume) => /* @__PURE__ */ jsx(ResumeCard, {
          resume
        }, resume.id))
      })]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-ClwBqAnQ.js", "imports": ["/assets/chunk-4WY6JWTD-NS4yDDl0.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-C9zfSNPh.js", "imports": ["/assets/chunk-4WY6JWTD-NS4yDDl0.js"], "css": ["/assets/root-DVAmj0uI.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-B30W5pvz.js", "imports": ["/assets/chunk-4WY6JWTD-NS4yDDl0.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-4e381892.js", "version": "4e381892", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
