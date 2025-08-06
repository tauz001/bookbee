/**
 * Cookie Policy Page for BookBee
 */

const CookiePolicyPage = () => {
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: [
        "This Cookie Policy explains how BookBee uses cookies and similar technologies to enhance your experience on our platform.",
        "By using our website, you consent to the use of cookies as described in this policy."
      ]
    },
    {
      id: "what-are-cookies",
      title: "2. What Are Cookies?",
      content: [
        "Cookies are small text files stored on your device by your web browser.",
        "They help us recognize your device, remember your preferences, and improve your experience."
      ]
    },
    {
      id: "types-of-cookies",
      title: "3. Types of Cookies We Use",
      content: [
        {
          subtitle: "Essential Cookies:",
          items: [
            "Necessary for the operation of our platform.",
            "Enable features like user authentication and secure access."
          ]
        },
        {
          subtitle: "Performance Cookies:",
          items: [
            "Collect information about how you use our platform.",
            "Help us improve functionality and user experience."
          ]
        },
        {
          subtitle: "Functional Cookies:",
          items: [
            "Remember your preferences and settings.",
            "Enhance personalization and convenience."
          ]
        },
        {
          subtitle: "Advertising Cookies:",
          items: [
            "Deliver relevant ads based on your interests.",
            "Track the effectiveness of our marketing campaigns."
          ]
        }
      ]
    },
    {
      id: "managing-cookies",
      title: "4. Managing Cookies",
      content: [
        "You can control cookies through your browser settings.",
        "Disabling cookies may affect the functionality of our platform.",
        "For more information, refer to your browser's help documentation."
      ]
    },
    {
      id: "changes-policy",
      title: "5. Changes to This Policy",
      content: [
        "We may update this Cookie Policy from time to time.",
        "Material changes will be communicated through our platform or email.",
        "Continued use of our platform constitutes acceptance of changes."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
            <p className="text-xl text-gray-600 mb-2">
              How BookBee uses cookies to enhance your experience
            </p>
            <p className="text-sm text-gray-500">Last Updated: {lastUpdated}</p>
          </div>

          {/* Table of Contents */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Table of Contents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-yellow-600 hover:text-yellow-700 text-sm py-1 transition-colors text-left"
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>

          {/* Cookie Policy Sections */}
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.id} id={section.id} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                <div className="space-y-6">
                  {section.content.map((item, index) => {
                    if (typeof item === 'string') {
                      return (
                        <p key={index} className="text-gray-700 leading-relaxed">{item}</p>
                      );
                    } else if (item.subtitle) {
                      return (
                        <div key={index}>
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">{item.subtitle}</h3>
                          <ul className="space-y-2">
                            {item.items.map((listItem, listIndex) => (
                              <li key={listIndex} className="flex items-start">
                                <span className="flex-shrink-0 w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3"></span>
                                <span className="text-gray-700 leading-relaxed">{listItem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center mt-12 py-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              © 2025 BookBee Technologies Pvt. Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;