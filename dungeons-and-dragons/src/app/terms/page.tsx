import type { Metadata } from "next";
import { constructMetadata, pageMetadata } from "@/../config/seo";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = constructMetadata(pageMetadata.terms);

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="May 12, 2026">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing Dice & Codex, you agree to comply with and be bound by
          these Terms of Service. If you do not agree, please do not use the
          application.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          2. Use of Service
        </h2>
        <p>
          Dice & Codex provides tools and guides for tabletop roleplaying games.
          This service is provided for personal, non-commercial use. You agree
          not to use the service for any illegal or unauthorized purposes.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          3. Intellectual Property
        </h2>
        <p>
          Dice & Codex is inspired by fantasy tabletop roleplaying games.
          Dungeons & Dragons and Wizards of the Coast are trademarks of their
          respective owners. Dice & Codex is not affiliated with, endorsed,
          sponsored, or specifically approved by Wizards of the Coast LLC.
        </p>
        <p className="mt-4">
          The code, design, and original content of this site are the property
          of the Dice & Codex contributors.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          4. Disclaimer of Warranties
        </h2>
        <p>
          The service is provided "as is" without any warranties. We do not
          guarantee that the tools (e.g., dice rollers, generators) will produce
          specific results or that the service will be uninterrupted or
          error-free.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          5. Limitation of Liability
        </h2>
        <p>
          Dice & Codex shall not be liable for any direct, indirect, incidental,
          or consequential damages resulting from the use or inability to use
          the service, including but not limited to the loss of character data
          stored in local storage.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">6. Modifications</h2>
        <p>
          We reserve the right to modify these terms at any time. Your continued
          use of the site after changes are posted constitutes acceptance of the
          new terms.
        </p>
      </section>
    </LegalPage>
  );
}
