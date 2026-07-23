#!/bin/bash
# Four Great Chinese Novels - Web App
# Start a simple HTTP server

echo "Starting Four Great Chinese Novels web app..."
echo "Open http://localhost:8080 in your browser"
echo ""
echo "Pages:"
echo "  Landing:    http://localhost:8080/index.html"
echo "  Three Kingdoms: http://localhost:8080/three-kingdoms.html"
echo "  Water Margin:   http://localhost:8080/water-margin.html"
echo "  Journey West:   http://localhost:8080/journey-west.html"
echo "  Red Chamber:    http://localhost:8080/red-chamber.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 -m http.server 8080
