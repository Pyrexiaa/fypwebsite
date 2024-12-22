export function DisclaimerSettingsContent() {
    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">Disclaimer</h2>
            <div className="space-y-4">
                <p className="text-sm text-gray-700">
                    Welcome to our platform! Please note that this website is created solely for academic purposes as
                    part of a final year project.
                </p>
                <p className="text-sm text-gray-700">
                    The content and functionality provided herein are not intended for commercial use or to generate any
                    profit. The primary aim is to showcase skills, knowledge, and application in a real-world scenario.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
                    <p className="text-sm text-blue-800">
                        <strong>Important:</strong> <br />
                        Any data, analysis, or information presented on this platform should not be considered
                        professional advice or a substitute for consulting experts in the relevant field. While the
                        information provided here can act as supplementary material to help you make more informed
                        decisions, it should not be treated as a definitive answer or sole basis for critical decisions.
                    </p>
                </div>
                <div className="pt-4">
                    <p className="text-sm font-bold text-gray-700">
                        By using this platform, you agree to the terms and acknowledge its academic nature.
                    </p>
                </div>
            </div>
        </div>
    );
}
