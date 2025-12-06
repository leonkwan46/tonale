#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variable to track current test
current_test_file=""

# Global variables for tracking test results (needed for interrupt handler)
failed_test_names=()
passed_tests=0
failed_tests=0
total_tests=0

# Check for stage parameter
STAGE="${1:-}"
TEST_DIR="tests/e2e"

# Handle interrupt signal (Ctrl+C)
handle_interrupt() {
    echo -e "\n${YELLOW}⚠️  Test execution interrupted by user${NC}"
    echo ""
    
    # Show summary of tests run so far
    # Note: We need to access variables that may have been set in the main loop
    # Since bash trap handlers run in the same shell, we can access these
    local tests_run=$((passed_tests + failed_tests))
    if [ $tests_run -gt 0 ]; then
        echo -e "${BLUE}📊 Test Summary (interrupted):${NC}"
        echo -e "Tests run: $tests_run | ${GREEN}Passed: $passed_tests${NC} | ${RED}Failed: $failed_tests${NC}"
        echo ""
        
        # Show failed tests if any
        if [ ${#failed_test_names[@]} -gt 0 ]; then
            echo -e "${RED}❌ Failed tests:${NC}"
            for failed_test in "${failed_test_names[@]}"; do
                echo -e "${YELLOW}  - $failed_test${NC}"
                # Try to find the test file path (remove any "(skipped)" suffix)
                clean_test_name="${failed_test% (skipped)}"
                failed_file=$(find tests/e2e -name "${clean_test_name}.yaml" -type f ! -path "*/helpers/*" | head -1)
                if [ -n "$failed_file" ]; then
                    echo -e "${YELLOW}    Run to debug: ${GREEN}maestro test $failed_file${NC}"
                fi
            done
            echo ""
        fi
    fi
    
    # Clean up any temporary test files
    find tests/e2e -name "*.tmp" -type f -delete 2>/dev/null
    
    if [ -n "$current_test_file" ]; then
        echo -e "${YELLOW}Current test (interrupted):${NC}"
        echo -e "${GREEN}maestro test $current_test_file${NC}"
        echo ""
    fi
    
    exit 130
}
trap handle_interrupt INT


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

# If stage is specified, only run tests for that stage
if [ -n "$STAGE" ]; then
    if [ "$STAGE" = "stage-0" ] || [ "$STAGE" = "stage-1" ] || [ "$STAGE" = "stage-2" ]; then
        TEST_DIR="tests/e2e/$STAGE"
        echo -e "${BLUE}📁 Running tests for: $STAGE${NC}"
        echo ""
        if [ ! -d "$TEST_DIR" ]; then
            echo -e "${RED}❌ Test directory not found: $TEST_DIR${NC}"
            exit 1
        fi
    else
        echo -e "${RED}❌ Invalid stage: $STAGE${NC}"
        echo -e "${YELLOW}Valid stages: stage-0, stage-1, stage-2${NC}"
        exit 1
    fi
else
    echo -e "${BLUE}📁 Running all e2e tests${NC}"
    echo ""
fi

# Automatically discover all e2e test files
# If running all stages, process them in order: stage-0, stage-1, stage-2
# For each stage: run all regular tests first, then final test
if [ -z "$STAGE" ]; then
    # Running all stages - process each stage completely before moving to next
    test_files=()
    for stage_num in 0 1 2; do
        stage_dir="tests/e2e/stage-${stage_num}"
        if [ -d "$stage_dir" ]; then
            stage_regular_tests=($(find "$stage_dir" -name "*.yaml" -type f ! -name "*-final*.yaml" ! -path "*/helpers/*" | sort))
            stage_final_tests=($(find "$stage_dir" -name "*-final*.yaml" -type f ! -path "*/helpers/*" | sort))
            test_files=("${test_files[@]}" "${stage_regular_tests[@]}" "${stage_final_tests[@]}")
        fi
    done
else
    # Running specific stage - regular tests first, then final test
    regular_tests=($(find "$TEST_DIR" -name "*.yaml" -type f ! -name "*-final*.yaml" ! -path "*/helpers/*" | sort))
    final_tests=($(find "$TEST_DIR" -name "*-final*.yaml" -type f ! -path "*/helpers/*" | sort))
    test_files=("${regular_tests[@]}" "${final_tests[@]}")
fi

echo -e "${BLUE}🧪 Running E2E Tests...${NC}"
echo ""

# Counter for test results
total_tests=${#test_files[@]}
passed_tests=0
failed_tests=0
failed_test_names=()
current_stage=""
stage_regular_failed=false

# Timing variables
total_start_time=$(date +%s)
total_start_time=$((total_start_time * 1000))

# Run each test file
for test_file in "${test_files[@]}"; do
    current_test_file="$test_file"
    test_name=$(basename "$test_file" .yaml)
    
    # Detect stage from file path
    file_stage=""
    if [[ "$test_file" =~ stage-([0-9]) ]]; then
        file_stage="stage-${BASH_REMATCH[1]}"
    fi
    
    # Check if we're moving to a new stage
    if [ -n "$file_stage" ] && [ "$file_stage" != "$current_stage" ]; then
        # If previous stage had regular test failures, don't run final test
        if [ -n "$current_stage" ] && [ "$stage_regular_failed" = true ]; then
            echo -e "${RED}⚠️  Skipping final test for $current_stage due to regular test failures${NC}"
            echo ""
        fi
        current_stage="$file_stage"
        stage_regular_failed=false
        echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${BLUE}📚 Starting $current_stage${NC}"
        echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo ""
    fi
    
    # Check if this is a final test
    is_final_test=false
    if [[ "$test_name" == *"-final"* ]]; then
        is_final_test=true
    fi
    
    # Skip final test if regular tests in this stage failed
    if [ "$is_final_test" = true ] && [ "$stage_regular_failed" = true ]; then
        echo -e "${YELLOW}⏭️  Skipping: $test_name (regular tests failed in $current_stage)${NC}"
        ((failed_tests++))
        failed_test_names+=("$test_name (skipped)")
        echo ""
        continue
    fi
    
    echo -e "${YELLOW}Running: $test_name${NC}"
    
    # Start timing for this test
    test_start_time=$(date +%s)
    test_start_time=$((test_start_time * 1000))
    
    # Run the test - faker will generate unique emails/passwords automatically via createAccount.yaml
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
        ((failed_tests++))
        failed_test_names+=("$test_name")
        
        # Mark stage as having regular test failures (if not a final test)
        if [ "$is_final_test" = false ]; then
            stage_regular_failed=true
        fi
    fi
    echo ""
done

# Calculate total execution time
total_end_time=$(date +%s)
total_end_time=$((total_end_time * 1000))
total_duration=$((total_end_time - total_start_time))

# Print summary
echo -e "${BLUE}📊 Test Summary:${NC}"
echo -e "Total: $total_tests | ${GREEN}Passed: $passed_tests${NC} | ${RED}Failed: $failed_tests${NC}"
echo -e "${BLUE}⏱️  Total execution time: ${total_duration}ms${NC}"
echo ""

# Print failed tests if any
if [ $failed_tests -gt 0 ]; then
    echo -e "${RED}❌ Failed tests:${NC}"
    for failed_test in "${failed_test_names[@]}"; do
        echo -e "${YELLOW}  - $failed_test${NC}"
        # Find the test file path
        failed_file=$(find "$TEST_DIR" -name "${failed_test}.yaml" -type f | head -1)
        if [ -n "$failed_file" ]; then
            echo -e "${YELLOW}    Run to debug: ${GREEN}maestro test $failed_file${NC}"
        fi
    done
    echo ""
    exit 1
else
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    exit 0
fi
