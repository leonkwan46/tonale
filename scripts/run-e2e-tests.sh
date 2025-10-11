#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Array to store failed tests
failed_tests=()

# Flag to track if script was interrupted
interrupted=false

# Handle interrupt signal (Ctrl+C)
trap 'interrupted=true; echo -e "\n${YELLOW}⚠️  Test execution interrupted by user${NC}"; exit 130' INT

# Check if Firebase emulators are running
echo -e "${BLUE}🔍 Checking Firebase emulators...${NC}"
if ! lsof -i :9099 > /dev/null 2>&1 || ! lsof -i :8080 > /dev/null 2>&1 || ! lsof -i :5001 > /dev/null 2>&1; then
    echo -e "${RED}❌ Firebase emulators are not running${NC}"
    echo -e "${YELLOW}Please start the emulators first:${NC}"
    echo -e "${GREEN}npm run firebase${NC}"
    echo ""
    exit 1
fi
echo -e "${GREEN}✅ Firebase emulators detected${NC}"
echo ""

# Automatically discover all e2e test files
test_files=($(find tests/e2e -name "*.yaml" -type f | sort))

echo -e "${BLUE}🧪 Running E2E Tests...${NC}"
echo ""

# Counter for test results
total_tests=${#test_files[@]}
passed_tests=0
failed_tests_count=0

# Timing variables
total_start_time=$(date +%s)
total_start_time=$((total_start_time * 1000))

# Run each test file
for test_file in "${test_files[@]}"; do
    test_name=$(basename "$test_file" .yaml)
    echo -e "${YELLOW}Running: $test_name${NC}"
    
    # Start timing for this test
    test_start_time=$(date +%s)
    test_start_time=$((test_start_time * 1000))
    
    # Run the test and capture exit code
    if maestro test "$test_file" > /dev/null 2>&1; then
        test_end_time=$(date +%s)
        test_end_time=$((test_end_time * 1000))
        test_duration=$((test_end_time - test_start_time))
        printf "${GREEN}✅ %s - PASSED (%dms)${NC}\n" "$test_name" "$test_duration"
        ((passed_tests++))
    else
        test_end_time=$(date +%s)
        test_end_time=$((test_end_time * 1000))
        test_duration=$((test_end_time - test_start_time))
        printf "${RED}❌ %s - FAILED (%dms)${NC}\n" "$test_name" "$test_duration"
        failed_tests+=("$test_file")
        ((failed_tests_count++))
    fi
    echo ""
done

# Calculate total execution time
total_end_time=$(date +%s)
total_end_time=$((total_end_time * 1000))
total_duration=$((total_end_time - total_start_time))

# Print summary
echo -e "${BLUE}📊 Test Summary:${NC}"
echo -e "Total: $total_tests | ${GREEN}Passed: $passed_tests${NC} | ${RED}Failed: $failed_tests_count${NC}"
echo -e "${BLUE}⏱️  Total execution time: ${total_duration}ms${NC}"
echo ""

# Check if script was interrupted
if [ "$interrupted" = true ]; then
    echo -e "${YELLOW}⚠️  Test execution was interrupted${NC}"
    exit 130
fi

# If there are failed tests, show commands to run them individually
if [ ${#failed_tests[@]} -gt 0 ]; then
    echo -e "${RED}🚨 Failed Tests - Run individually with:${NC}"
    echo ""
    for failed_test in "${failed_tests[@]}"; do
        test_name=$(basename "$failed_test" .yaml)
        echo -e "${YELLOW}maestro test $failed_test${NC}"
    done
    echo ""
    echo -e "${BLUE}💡 Tip: Run individual tests to debug specific issues${NC}"
    
    # Exit with error code
    exit 1
else
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    exit 0
fi
