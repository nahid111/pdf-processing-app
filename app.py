from flask import Flask, jsonify, request
from flask_cors import CORS
import PyPDF2
from compliance_rules import evaluate_rules

app = Flask(__name__)
CORS(app)


@app.route('/api/upload-pdf', methods=['POST'])
def upload_pdf():
    if 'file' not in request.files:
        return jsonify(error="No file part"), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify(error="No selected file"), 400

    if file:
        pdf = PyPDF2.PdfReader(file)
        num_pages = len(pdf.pages)

        text = ""
        for page_num in range(num_pages):
            page = pdf.pages[page_num]
            text += page.extract_text()

        compliance_satisfied = evaluate_rules(text)

        if compliance_satisfied:
            message = "PDF processed successfully, and it complies with rules."
        else:
            message = "PDF processed successfully, but it does not comply with rules."

        return jsonify(message=message)

    return jsonify(error="Unsupported file format"), 400


if __name__ == '__main__':
    app.run(debug=True)
