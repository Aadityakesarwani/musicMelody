

const TermsOfService = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-2 text-center">Terms of Service</h1>
      <p className="text-center text-sm text-gray-500 mb-8">Effective date: April 3, 2024</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Acceptance of Terms</h2>
        <p>
          By accessing or using Music Melody the Services, you agree to be bound by these Terms of Service Terms.
          If you do not agree, you must discontinue use of the Service immediately. These Terms apply to all users,
          including visitors, registered members, and contributors. Failure to comply with these Terms may result in
          suspension or termination of access. You are responsible for regularly reviewing these Terms to stay informed
          of any updates.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Description of Service</h2>
        <p>
          Music Melody provides users with AI-generated music based on inputs and preferences. Our platform allows you
          to create, customize, and download AI-generated tracks. The generated music can be used for personal,
          non-commercial, or commercial purposes. Music Melody continuously improves its algorithms to provide
          high-quality compositions. Certain features may require a premium subscription for access to advanced tools.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">User Eligibility</h2>
        <p>
          To use our services, you must be at least 13 years old. If you are under 18, you must have permission from a
          parent or legal guardian. By using the Service, you confirm that you meet the age requirements. We reserve
          the right to request proof of age or parental consent if necessary. Failure to meet the eligibility criteria
          may result in account suspension.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">User Accounts</h2>
        <p>
          You may be required to create an account to access certain features. You are responsible for maintaining the
          security of your account credentials. Any activity under your account is your responsibility, including
          unauthorized access. If you suspect any breach of security, you must notify us immediately. We reserve the
          right to suspend accounts engaged in suspicious or fraudulent activities.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Ownership & Licensing</h2>
        <p>
          <strong>Generated Music:</strong> Users may use AI-generated music according to the licensing terms provided at the time of generation.
          <br />
          <strong>User-Uploaded Content:</strong> Any content you upload remains your property, but you grant us a license to use it for improving our services.
          <br />
          <strong>Music Melody’s Rights:</strong> We reserve the right to use generated music for research and development.
          <br />
          <strong>License Restrictions:</strong> Certain usage restrictions may apply depending on your subscription plan.
          <br />
          <strong>Copyright Compliance:</strong> Users must ensure that their inputs do not infringe on existing copyrighted materials.
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
